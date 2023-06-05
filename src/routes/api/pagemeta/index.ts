import type { RequestHandler } from "@builder.io/qwik-city";
import type { AbortMessage } from "@builder.io/qwik-city/middleware/request-handler";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";

export const pagemetaResponseSchema = z.object({
  reason: z.string().nullish(),
  title: z
    .object({
      value: z.string().nullish(),
      reason: z.string().nullish(),
    })
    .nullish(),
  summary: z
    .object({
      value: z.string().nullish(),
      reason: z.string().nullish(),
    })
    .nullish(),
});
type pagemetaResponseType = z.infer<typeof pagemetaResponseSchema>;
const pagemetaRequestSchema = z.object({ url: z.string() });
export type pagemetaRequestType = z.infer<typeof pagemetaRequestSchema>;

const searchTag = (
  html: any,
  tag: string,
  includeAttrs?: [string, string][],
  extractAttr?: string
): string | null => {
  const stack = [];
  stack.push(html);
  while (stack.length) {
    for (const j in stack[0]) {
      if (j === tag) {
        const result = (
          Array.isArray(stack[0][j]) ? stack[0][j] : [stack[0][j]]
        ).filter(
          (item: any) =>
            typeof item === "string" ||
            (includeAttrs ?? []).every(([k, v]) => item[`@_${k}`] === v)
        )[0];
        if (result != null) {
          return typeof result === "string" || extractAttr == null
            ? result
            : (Object.entries(result).filter(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ([k, _]) => k === `@_${extractAttr}`
              )[0] ?? [null, null])[1];
        }
      }
      if (stack[0][j].constructor === Object && stack[0][j].length !== 0) {
        stack.push(stack[0][j]);
      }
    }
    stack.shift();
  }
  return null;
};

export const onGet: RequestHandler = async ({ query, json: _json }) => {
  const json: (statusCode: number, data: pagemetaResponseType) => AbortMessage =
    _json;
  const { url } = pagemetaRequestSchema.parse(Object.fromEntries(query));
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) {
      json(200, {
        reason: `サイトにアクセスできませんでした（${
          response.statusText ?? response.status
        }）`,
      });
      return;
    }

    const html = await response.text();
    const parsed = new XMLParser({
      ignoreAttributes: false,
      unpairedTags: ["link", "meta", "base"],
      stopNodes: ["*.pre", "*.script"],
      processEntities: true,
      htmlEntities: true,
    }).parse(html);

    const title = searchTag(parsed, "title");
    const summary = searchTag(
      parsed,
      "meta",
      [["name", "description"]],
      "content"
    );
    json(200, {
      title: {
        value:
          title?.includes("\ufffd") || title == null || title === ""
            ? null
            : title,
        reason: title?.includes("\ufffd")
          ? "文字コードがUTF-8ではなかったため解析できませんでした"
          : title == null || title === ""
          ? "サイトにタイトルタグがありませんでした"
          : null,
      },
      summary: {
        value:
          summary?.includes("\ufffd") || summary == null || summary === ""
            ? null
            : summary,
        reason: summary?.includes("\ufffd")
          ? "文字コードがUTF-8ではなかったため解析できませんでした"
          : summary == null || summary === ""
          ? "サイトにmetaタグ（description）がありませんでした"
          : null,
      },
    });
  } catch (e) {
    console.log(e);
    json(200, {
      title: null,
      summary: null,
      reason:
        e instanceof DOMException && e.name === "TimeoutError"
          ? "もう一度お試しください"
          : `不明なエラーです（${String(e)}）`,
    });
  }
};
