import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, `entry.${number}.summary`>;
  props: FieldElementProps<FeedCreateRequestBody, `entry.${number}.summary`>;
}>(({ field, props }) => {
  return (
    <ItemRow description="記事の概要" error={field.error}>
      <Textbox
        {...props}
        value={field.value}
        placeholder="素敵な記事説明..."
        error={!!field.error}
      />
    </ItemRow>
  );
});
