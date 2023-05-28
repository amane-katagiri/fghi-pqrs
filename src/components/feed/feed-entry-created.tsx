import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import DatetimeInput from "../form/datetime";
import ItemRow from "./item-row";
import type { FeedCreateRequestBody } from "~/schema/feed-create";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, `entry.${number}.created`>;
  props: FieldElementProps<FeedCreateRequestBody, `entry.${number}.created`>;
}>(({ field, props }) => {
  return (
    <ItemRow description="作成日時" error={field.error}>
      <DatetimeInput {...props} field={field} />
    </ItemRow>
  );
});
