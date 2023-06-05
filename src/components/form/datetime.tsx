import type { QwikChangeEvent, QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import type { FieldElement, Maybe } from "@modular-forms/qwik";
import DateInput from "./date";
import TimeInput from "./time";

const extractDate = (value?: string) => {
  try {
    return value != null && value !== ""
      ? new Date(
          new Date(value).getTime() - new Date().getTimezoneOffset() * 60 * 1000
        )
          .toISOString()
          .split("T", 1)[0]
      : value;
  } catch {
    return value;
  }
};
const extractTime = (value?: string) => {
  try {
    return value != null && value !== ""
      ? new Date(
          new Date(`1980-01-01T${value.split("T", 2)[1] ?? value}`).getTime() -
            new Date().getTimezoneOffset() * 60 * 1000
        )
          .toISOString()
          .split("T", 2)[1]
          ?.slice(0, 5)
      : value;
  } catch (e) {
    return value;
  }
};

export default component$<
  QwikIntrinsicElements["input"] & {
    field: { value: Maybe<string> };
    setValue: (value?: string) => void;
  }
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ value, field, setValue, children, ...props }) => {
    const dateValue = useSignal<string>(extractDate(field.value) ?? "");
    const timeValue = useSignal<string>(extractTime(field.value) ?? "");
    const timezoneOffset = new Date().getTimezoneOffset();
    const tz =
      timezoneOffset === 0
        ? "Z"
        : `${timezoneOffset < 0 ? "+" : "-"}${String(
            Math.abs(Math.floor(timezoneOffset / 60))
          ).padStart(2, "0")}:${String(
            Math.floor(Math.abs(timezoneOffset) % 60)
          ).padStart(2, "0")}`;
    return (
      <>
        <DateInput
          onChange$={(e: QwikChangeEvent<FieldElement>) => {
            dateValue.value = e.target?.value ?? "";
            setValue(`${dateValue.value}T${timeValue.value}:00${tz}`);
          }}
          value={dateValue.value}
        />
        <TimeInput
          onChange$={(e: QwikChangeEvent<FieldElement>) => {
            timeValue.value = e.target?.value ?? "";
            setValue(`${dateValue.value}T${timeValue.value}:00${tz}`);
          }}
          value={timeValue.value}
        />
      </>
    );
  }
);
