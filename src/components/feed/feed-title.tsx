import { $, component$ } from "@builder.io/qwik";
import type {
  FieldElementProps,
  FieldStore,
  FormStore,
} from "@modular-forms/qwik";
import { focus, setValue } from "@modular-forms/qwik";
import type { FeedCreateRequestBody } from "~/schema/feed-create";
import MetadataButton from "../form/metadata-button";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";

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
          setValue={$((value?: string) => {
            setValue(form, field.name, value ?? "");
            focus(form, field.name);
          })}
        />
      </div>
    </ItemRow>
  );
});
