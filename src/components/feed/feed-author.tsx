import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, "feedAuthor">;
  props: FieldElementProps<FeedCreateRequestBody, "feedAuthor">;
}>(({ field, props }) => {
  return (
    <ItemRow description="サイトの作者名" error={field.error}>
      <Textbox
        {...props}
        value={field.value}
        placeholder="あなたの名前..."
        error={!!field.error}
      />
    </ItemRow>
  );
});
