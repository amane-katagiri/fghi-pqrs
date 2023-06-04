import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useComputed$ } from "@builder.io/qwik";

export default component$<
  Omit<QwikIntrinsicElements["input"], "value"> & { value?: string }
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ value, children, ...props }) => {
    const input = useComputed$(() => value?.split("T", 1)[0] ?? value);
    return <input {...props} type="date" value={input.value} />;
  }
);
