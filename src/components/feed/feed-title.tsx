import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, "feedTitle">;
  props: FieldElementProps<FeedCreateRequestBody, "feedTitle">;
}>(({ field, props }) => {
  return (
    <ItemRow description="サイトのタイトル" error={field.error}>
      <Textbox
        {...props}
        value={field.value}
        placeholder="素敵なマイブログ..."
        error={!!field.error}
      />
    </ItemRow>
  );
});
