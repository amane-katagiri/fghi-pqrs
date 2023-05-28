import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, "feedCreated">;
  props: FieldElementProps<FeedCreateRequestBody, "feedCreated">;
}>(({ field, props }) => {
  return (
    <ItemRow description="フィード作成年" error={field.error}>
      <Textbox
        {...props}
        type="number"
        value={field.value}
        placeholder="YYYY"
        error={!!field.error}
      />
    </ItemRow>
  );
});
