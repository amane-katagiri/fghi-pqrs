import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, `entry.${number}.title`>;
  props: FieldElementProps<FeedCreateRequestBody, `entry.${number}.title`>;
}>(({ field, props }) => {
  return (
    <ItemRow description="タイトル" error={field.error}>
      <Textbox
        {...props}
        value={field.value}
        placeholder="素敵な記事タイトル..."
        error={!!field.error}
      />
    </ItemRow>
  );
});
