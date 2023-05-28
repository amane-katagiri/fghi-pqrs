import { XMLBuilder } from "fast-xml-parser";
import type { FeedCreateRequestBody } from "../schema/feed-create";

export const buildFeedXml = (params: FeedCreateRequestBody): string => {
  const feedAlterUrl = params.feedAlterUrl !== "" ? params.feedAlterUrl : null;
  const feedSelfUrl = params.feedSelfUrl !== "" ? params.feedSelfUrl : null;
  const { hostname, pathname } = new URL(
    feedAlterUrl ?? `https://${crypto.randomUUID()}.example.com/feed`
  );
  const feedId = `tag:${hostname},${params.feedCreated.padStart(
    4,
    "0"
  )}:${pathname}?feed`;

  const entries = (params.entry ?? [])
    .slice(0)
    .sort((a, b) =>
      a.updated === b.updated
        ? a.created === b.created
          ? 0
          : a.created > b.created
          ? -1
          : 1
        : a.updated > b.updated
        ? -1
        : 1
    )
    .map((e) => {
      const { hostname, pathname } = new URL(e.url);
      return {
        entry: [
          { title: e.title },
          {
            link: {
              "@@rel": "alternate",
              "@@href": e.url,
            },
          },
          { author: [{ name: e.authorName }] },
          { summary: e.summary },
          {
            id: `tag:${hostname},${e.created.slice(0, 10)}:${pathname}`,
          },
          { updated: e.updated },
          { published: e.created },
        ],
      };
    });

  const builder = new XMLBuilder({
    oneListGroup: true,
    ignoreAttributes: false,
    attributeNamePrefix: "@@",
    format: true,
    indentBy: "  ",
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">${`${builder.build({
    feed: [
      { title: params.feedTitle },
      ...(feedAlterUrl == null
        ? []
        : [{ link: { "@@rel": "alternate", "@@href": feedAlterUrl } }]),
      ...(feedSelfUrl == null
        ? []
        : [{ link: { "@@rel": "self", "@@href": feedSelfUrl } }]),
      { id: feedId },
      { updated: new Date().toISOString() },
      { author: [{ name: params.feedAuthor }] },
      ...entries,
    ],
  })}`.slice("<feed>".length)}`;
};
