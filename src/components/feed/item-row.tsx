import { component$, Slot } from "@builder.io/qwik";

export default component$<{
  description: string;
  error?: string;
}>(({ description, error }) => {
  return (
    <>
      <div class="flex items-center">{description}</div>
      <div class="flex items-center gap-2 flex-wrap">
        <Slot />
      </div>
      <div class="col-start-2 text-error text-sm min-h-[1.5rem]">
        {error ? error : ""}
      </div>
    </>
  );
});
