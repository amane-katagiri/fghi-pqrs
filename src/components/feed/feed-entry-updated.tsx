import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import type { FeedCreateRequestBody } from "~/schema/feed-create";
import DatetimeInput from "../form/datetime";
import ItemRow from "./item-row";

export default component$<{
  field: FieldStore<FeedCreateRequestBody, `entry.${number}.updated`>;
  setValue: (value?: string) => void;
  props: FieldElementProps<FeedCreateRequestBody, `entry.${number}.updated`>;
}>(({ field, setValue, props }) => {
  return (
    <ItemRow description="更新日時" error={field.error}>
      <DatetimeInput {...props} field={field} setValue={setValue} />
    </ItemRow>
  );
});
