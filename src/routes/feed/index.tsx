import {
  $,
  Slot,
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";
import {
  formAction$,
  getValue,
  insert,
  remove,
  setValue,
  useForm,
  zodForm$,
} from "@modular-forms/qwik";
import {
  HiCodeBracketSolid,
  HiPencilSolid,
  HiPlusSolid,
  HiTrashOutline,
} from "@qwikest/icons/heroicons";
import FeedAlterUrlRow from "~/components/feed/feed-alter-url";
import FeedAuthorRow from "~/components/feed/feed-author";
import FeedCreatedRow from "~/components/feed/feed-created";
import FeedEntryAuthorRow from "~/components/feed/feed-entry-author";
import FeedEntryCreatedRow from "~/components/feed/feed-entry-created";
import FeedEntrySummaryRow from "~/components/feed/feed-entry-summary";
import FeedEntryTitleRow from "~/components/feed/feed-entry-title";
import FeedEntryUpdatedRow from "~/components/feed/feed-entry-updated";
import FeedEntryUrlRow from "~/components/feed/feed-entry-url";
import FeedSelfUrlRow from "~/components/feed/feed-self-url";
import FeedTitleRow from "~/components/feed/feed-title";
import { buildFeedXml } from "~/feed/builder";
import type { FeedCreateRequestBody } from "~/schema/feed-create";
import { feedCreateRequestBodySchema } from "~/schema/feed-create";

export const useRouteLoader = routeLoader$<
  InitialValues<FeedCreateRequestBody>
>((requestEvent) => ({
  feedAlterUrl: requestEvent.url.searchParams.get("feed-alter-url") ?? "",
  feedTitle: requestEvent.url.searchParams.get("feed-title") ?? "",
  feedAuthor: requestEvent.url.searchParams.get("feed-author") ?? "",
  feedCreated: requestEvent.url.searchParams.get("feed-created") ?? "",
  feedSelfUrl: requestEvent.url.searchParams.get("feed-self-url") ?? "",
  entry: [],
}));

export const useFormAction = formAction$<FeedCreateRequestBody>(
  (values) => ({ status: "success", message: buildFeedXml(values) }),
  zodForm$(feedCreateRequestBodySchema)
);

const Title = component$(({ title }: { title: string }) => (
  <div class="flex items-center gap-2 text-lg font-bold text-primary-dark">
    {title}
    <Slot />
  </div>
));

const ResultTextarea = ({ value }: { value: string }) => (
  <textarea
    value={value}
    readOnly
    class="w-full h-80 flex-grow p-2 rounded-md resize-none leading-5"
  />
);

export default component$(() => {
  const [feedForm, { Form, Field, FieldArray }] =
    useForm<FeedCreateRequestBody>({
      loader: useRouteLoader(),
      action: useFormAction(),
      validate: zodForm$(feedCreateRequestBodySchema),
      validateOn: "touched",
      revalidateOn: "touched",
    });

  const navigate = useNavigate();
  const updateUrlParams = $(() =>
    navigate(
      `?${new URLSearchParams(
        [
          ["feed-alter-url", getValue(feedForm, "feedAlterUrl") ?? ""],
          ["feed-title", getValue(feedForm, "feedTitle") ?? ""],
          ["feed-author", getValue(feedForm, "feedAuthor") ?? ""],
          ["feed-created", getValue(feedForm, "feedCreated") ?? ""],
          ["feed-self-url", getValue(feedForm, "feedSelfUrl") ?? ""],
        ].filter<string[]>((p): p is string[] => p[1] != null)
      )}`
    )
  );

  const feedOpened = useSignal(false);
  useTask$(({ track }) => {
    const feedEmitted = track(
      () =>
        !feedForm.invalid &&
        feedForm.response.status === "success" &&
        !!feedForm.response.message
    );
    feedOpened.value = feedEmitted;
  });
  useVisibleTask$(({ track }) => {
    track(() => feedOpened.value);
    window.scrollTo({ top: 0, left: 0 });
  });

  return (
    <>
      <div class="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 mx-auto mb-14">
        {feedOpened.value && (
          <div class="flex flex-col gap-2">
            <Title title="フィードの出力結果" />
            <div>出力結果をコピーしてサイトの読者に配布しましょう！</div>
            <div>
              公開前に
              <a
                class="text-primary hover:underline"
                href="https://validator.w3.org/feed/#validate_by_input"
                target="_blank"
              >
                W3C Feed Validation Service
              </a>
              でフィードをチェックできます
            </div>
            <div class="flex flex-col gap-2 mt-4">
              <div class="font-bold">
                {getValue(feedForm, "feedSelfUrl") ? (
                  <code class="px-1">{getValue(feedForm, "feedSelfUrl")}</code>
                ) : (
                  "フィードの場所"
                )}
                に配置します:
              </div>
              <ResultTextarea value={feedForm.response.message ?? ""} />
            </div>
            {getValue(feedForm, "feedSelfUrl") && (
              <div class="flex flex-col gap-2 mt-4">
                <div class="font-bold">
                  {getValue(feedForm, "feedAlterUrl") ? (
                    <code class="px-1">
                      {getValue(feedForm, "feedAlterUrl")}
                    </code>
                  ) : (
                    "サイト"
                  )}
                  の<code class="px-1">&lt;head&gt;</code>～
                  <code class="px-1">&lt;/head&gt;</code>
                  の間に貼り付けます:
                </div>
                <ResultTextarea
                  value={(() => {
                    const link = document.createElement("link");
                    link.href = getValue(feedForm, "feedSelfUrl") ?? "";
                    link.type = "application/atom+xml";
                    link.rel = "alternate";
                    link.title = `${
                      getValue(feedForm, "feedTitle")
                        ? getValue(feedForm, "feedTitle")
                        : "サイトタイトル"
                    } Atom Feed`;
                    return link.outerHTML;
                  })()}
                />
              </div>
            )}
          </div>
        )}
        <Form
          id="feedCreateForm"
          class={`w-full flex flex-col gap-2${
            feedOpened.value ? " hidden" : ""
          }`}
        >
          <Title title="サイト・フィードの設定" />
          <div class="grid grid-cols-[auto,1fr] gap-x-2">
            <Field name="feedAlterUrl">
              {(field, props) => (
                <FeedAlterUrlRow field={field} props={props} />
              )}
            </Field>
            <Field name="feedTitle">
              {(field, props) => (
                <FeedTitleRow
                  form={feedForm}
                  field={field}
                  props={props}
                  siteUrl={getValue(feedForm, "feedAlterUrl")}
                />
              )}
            </Field>
            <Field name="feedAuthor">
              {(field, props) => <FeedAuthorRow field={field} props={props} />}
            </Field>
            <Field name="feedCreated">
              {(field, props) => <FeedCreatedRow field={field} props={props} />}
            </Field>
            <Field name="feedSelfUrl">
              {(field, props) => <FeedSelfUrlRow field={field} props={props} />}
            </Field>
          </div>
          <Title title="記事の一覧">
            <button
              class={
                "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-white bg-primary hover:bg-primary-hover"
              }
              type="button"
              onClick$={() => {
                insert(feedForm, "entry", {
                  value: {
                    key: Math.floor(Math.random() * 360).toString(),
                    url: "",
                    title: "",
                    summary: "",
                    authorName: getValue(feedForm, "feedAuthor") ?? "",
                    created: `${
                      new Date().toISOString().split("T", 1)[0]
                    }T00:00:00Z`,
                    updated: new Date().toISOString(),
                  },
                  at: 0,
                });
              }}
            >
              <HiPlusSolid class="h-5 w-5" />
            </button>
          </Title>
          <FieldArray name="entry">
            {(fieldArray) => (
              <>
                {fieldArray.items.length === 0 ? (
                  <div class="text-sm">
                    まだ記事がありません。
                    <div
                      class={
                        "mx-1 inline-flex items-center justify-center w-5 h-5 rounded-full text-white bg-primary"
                      }
                    >
                      <HiPlusSolid class="w-3 h-3" />
                    </div>
                    ボタンを押してフィードを充実させましょう。
                  </div>
                ) : (
                  fieldArray.items.map((key, i) => {
                    return (
                      <div key={key} class="pb-4 bg-white shadow-md rounded-md">
                        <Field name={`entry.${i}.key`}>
                          {(field, props) => (
                            <>
                              <input
                                {...props}
                                type="hidden"
                                value={field.value}
                              />
                              <div
                                style={`background: hsl(${field.value}, 75%, 75%);`}
                                class="rounded-t p-2 mb-4"
                              ></div>
                            </>
                          )}
                        </Field>
                        <div class="px-4 grid grid-cols-[auto,1fr] gap-x-2">
                          <Field name={`entry.${i}.url`}>
                            {(field, props) => (
                              <FeedEntryUrlRow field={field} props={props} />
                            )}
                          </Field>
                          <Field name={`entry.${i}.title`}>
                            {(field, props) => (
                              <FeedEntryTitleRow
                                form={feedForm}
                                field={field}
                                props={props}
                                entryUrl={getValue(feedForm, `entry.${i}.url`)}
                              />
                            )}
                          </Field>
                          <Field name={`entry.${i}.summary`}>
                            {(field, props) => (
                              <FeedEntrySummaryRow
                                form={feedForm}
                                field={field}
                                props={props}
                                entryUrl={getValue(feedForm, `entry.${i}.url`)}
                              />
                            )}
                          </Field>
                          <Field name={`entry.${i}.authorName`}>
                            {(field, props) => (
                              <FeedEntryAuthorRow field={field} props={props} />
                            )}
                          </Field>
                          <Field name={`entry.${i}.created`}>
                            {(field, props) => (
                              <FeedEntryCreatedRow
                                field={field}
                                setValue={$((value?: string) =>
                                  setValue(
                                    feedForm,
                                    `entry.${i}.created`,
                                    value ?? ""
                                  )
                                )}
                                props={props}
                              />
                            )}
                          </Field>
                          <Field name={`entry.${i}.updated`}>
                            {(field, props) => (
                              <FeedEntryUpdatedRow
                                field={field}
                                setValue={$((value?: string) =>
                                  setValue(
                                    feedForm,
                                    `entry.${i}.updated`,
                                    value ?? ""
                                  )
                                )}
                                props={props}
                              />
                            )}
                          </Field>
                        </div>
                        <div class="flex justify-end px-4">
                          <button
                            class="flex-shrink-0 flex items-center border border-primary hover:border-primary-hover justify-center text-primary hover:text-primary-hover w-9 h-9 rounded-full"
                            type="button"
                            onClick$={() => {
                              remove(feedForm, "entry", { at: i });
                            }}
                          >
                            <HiTrashOutline class="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </>
            )}
          </FieldArray>
        </Form>
      </div>
      <div class="fixed bottom-4 right-4">
        {!feedOpened.value ? (
          <button
            class={`flex items-center justify-center rounded-full w-16 h-16 text-white bg-primary hover:bg-primary-hover${
              feedForm.submitting
                ? " bg-disabled-text hover:bg-disabled-text"
                : ""
            }`}
            type="submit"
            form="feedCreateForm"
            disabled={feedForm.submitting}
            onClick$={updateUrlParams}
          >
            <HiCodeBracketSolid class="w-6 h-6" />
          </button>
        ) : (
          <button
            class="flex items-center justify-center rounded-full w-16 h-16 text-white bg-primary hover:bg-primary-hover"
            onClick$={() => {
              feedOpened.value = false;
              feedForm.response = {};
            }}
          >
            <HiPencilSolid class="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const { feedTitle } = resolveValue(useRouteLoader);
  return {
    title:
      feedTitle === "" ? "無料フィード作成" : `${feedTitle}のフィードを作成`,
  };
};
