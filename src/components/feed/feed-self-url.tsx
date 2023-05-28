import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, "feedSelfUrl">;
  props: FieldElementProps<FeedCreateRequestBody, "feedSelfUrl">;
}>(({ field, props }) => {
  return (
    <ItemRow description="フィードの場所" error={field.error}>
      <Textbox
        {...props}
        value={field.value}
        placeholder="https://example.com/..."
        error={!!field.error}
      />
    </ItemRow>
  );
});
