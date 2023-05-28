import { component$, Slot } from "@builder.io/qwik";

export default component$<{
  description: string;
  error?: string;
  shown: boolean;
}>(({ description, error, shown }) => {
  return (
    <div class={`w-full flex flex-col${shown ? "" : " hidden"}`}>
      <div class="mb-2">{description}</div>
      <Slot />
      <div class="text-right text-error text-sm min-h-[1rem]">
        {error ? error : ""}
      </div>
    </div>
  );
});
