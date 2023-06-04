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
  field: FieldStore<FeedCreateRequestBody, `entry.${number}.title`>;
  props: FieldElementProps<FeedCreateRequestBody, `entry.${number}.title`>;
  entryUrl?: string;
}>(({ form, field, props, entryUrl }) => {
  return (
    <ItemRow description="タイトル" error={field.error}>
      <div class="w-full flex gap-2 items-center">
        <Textbox
          {...props}
          value={field.value}
          placeholder="素敵な記事タイトル..."
          error={!!field.error}
        />
        <MetadataButton
          field={field}
          url={entryUrl}
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
