import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import Textbox from "../form/textbox";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, `entry.${number}.authorName`>;
  props: FieldElementProps<FeedCreateRequestBody, `entry.${number}.authorName`>;
}>(({ field, props }) => {
  return (
    <ItemRow description="記事の作者" error={field.error}>
      <Textbox
        {...props}
        value={field.value}
        placeholder="あなたの名前..."
        error={!!field.error}
      />
    </ItemRow>
  );
});
