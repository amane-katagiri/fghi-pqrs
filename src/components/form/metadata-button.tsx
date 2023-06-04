import { component$, useSignal } from "@builder.io/qwik";
import type { FieldStore } from "@modular-forms/qwik";
import { HiArrowDownTraySolid } from "@qwikest/icons/heroicons";
import { pagemetaResponseSchema } from "~/routes/api/pagemeta";
import type { FeedCreateRequestBody } from "~/schema/feed-create";
import type { WizardForm } from "~/schema/wizard";

type ExtractWizardForm<T> = T extends keyof WizardForm
  ? FieldStore<WizardForm, T>
  : never;
type ExtractFeedCreateRequestBody<T> = T extends keyof FeedCreateRequestBody
  ? FieldStore<FeedCreateRequestBody, T>
  : never;
type ExtractFeedCreateRequestBodyEntry<T> =
  T extends keyof Required<FeedCreateRequestBody>["entry"][number]
    ? FieldStore<FeedCreateRequestBody, `entry.${number}.${T}`>
    : never;

type Field =
  | ExtractWizardForm<keyof WizardForm>
  | ExtractFeedCreateRequestBody<keyof FeedCreateRequestBody>
  | ExtractFeedCreateRequestBodyEntry<
      keyof Required<FeedCreateRequestBody>["entry"][number]
    >;

export default component$<{
  meta: "title" | "summary";
  field: Field;
  url?: string;
  afterFetch: () => Promise<void>;
}>(({ meta, field, url, afterFetch }) => {
  const fetchLoading = useSignal<boolean>(false);
  return (
    <button
      type="button"
      disabled={fetchLoading.value || url == null || url === ""}
      class={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border ${
        fetchLoading.value || url == null || url === ""
          ? "border-disabled-text text-disabled-text"
          : "border-primary text-primary hover:border-primary-hover hover:text-primary-hover"
      }`}
      onClick$={async () => {
        try {
          if (!url) {
            return;
          }
          fetchLoading.value = true;
          const response = await fetch(
            `/api/pagemeta?${new URLSearchParams([["url", url]]).toString()}`
          );
          if (!response.ok) {
            throw `取得中にエラーが発生しました（${response.statusText}）`;
          }
          const json = pagemetaResponseSchema.parse(await response.json());
          if ([json.reason, json[meta]?.reason].some((item) => item != null)) {
            throw [json.reason, json[meta]?.reason]
              .filter((item) => item != null)
              .join(" ");
          }
          const before = field.value;
          field.value = "";
          field.value = json[meta]?.value ?? before;
        } catch (e) {
          alert(String(e));
        } finally {
          fetchLoading.value = false;
        }
        await afterFetch();
      }}
    >
      <HiArrowDownTraySolid class="w-5 h-5" />
    </button>
  );
});
