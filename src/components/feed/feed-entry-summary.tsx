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
  field: FieldStore<FeedCreateRequestBody, `entry.${number}.summary`>;
  props: FieldElementProps<FeedCreateRequestBody, `entry.${number}.summary`>;
  entryUrl?: string;
}>(({ form, field, props, entryUrl }) => {
  return (
    <ItemRow description="記事の概要" error={field.error}>
      <div class="w-full flex gap-2 items-center">
        <Textbox
          {...props}
          value={field.value}
          placeholder="素敵な記事説明..."
          error={!!field.error}
        />
        <MetadataButton
          field={field}
          url={entryUrl}
          meta="summary"
          afterFetch={$(async () => {
            await validate(form, field.name);
          })}
        />
      </div>
    </ItemRow>
  );
});
