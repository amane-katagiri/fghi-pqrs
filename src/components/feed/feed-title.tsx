import { $, component$ } from "@builder.io/qwik";
import type {
  FieldElementProps,
  FieldStore,
  FormStore,
} from "@modular-forms/qwik";
import { validate } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";
import MetadataButton from "../form/metadata-button";

export default component$<{
  form: FormStore<FeedCreateRequestBody, undefined>;
  field: FieldStore<FeedCreateRequestBody, "feedTitle">;
  props: FieldElementProps<FeedCreateRequestBody, "feedTitle">;
  siteUrl?: string;
}>(({ form, field, props, siteUrl }) => {
  return (
    <ItemRow description="サイトのタイトル" error={field.error}>
      <div class="w-full flex gap-2 items-center">
        <Textbox
          {...props}
          value={field.value}
          placeholder="素敵なマイブログ..."
          error={!!field.error}
        />
        <MetadataButton
          field={field}
          url={siteUrl}
          meta="title"
          afterFetch={$(async () => {
            await validate(form, field.name);
          })}
        />
      </div>
    </ItemRow>
  );
});
