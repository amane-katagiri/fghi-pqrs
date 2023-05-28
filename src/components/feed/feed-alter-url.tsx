import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, "feedAlterUrl">;
  props: FieldElementProps<FeedCreateRequestBody, "feedAlterUrl">;
}>(({ field, props }) => {
  return (
    <ItemRow description="サイトの場所" error={field.error}>
      <Textbox
        {...props}
        value={field.value}
        placeholder="https://example.com/..."
        error={!!field.error}
      />
    </ItemRow>
  );
});
