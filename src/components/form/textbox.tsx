import { component$ } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

export default component$<QwikIntrinsicElements["input"] & { error: boolean }>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ error, children, ...props }) => (
    <input
      {...props}
      class={`w-full rounded-sm py-2 px-3 shadow-sm border focus:outline-none focus:ring-1 ${
        error
          ? "text-error border-error focus:ring-error focus:border-error"
          : "border-primary-dark  focus:border-primary focus:ring-primary"
      }`}
    />
  )
);
