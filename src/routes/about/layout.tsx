import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="markdown w-full h-full mt-2 sm:mt-8 md:mt-12 sm:w-5/6 md:w-3/4 lg:w-1/2 mx-auto leading-6">
      <Slot />
    </div>
  );
});
