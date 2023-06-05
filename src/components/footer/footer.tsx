import { component$ } from "@builder.io/qwik";

export default component$(() => (
  <footer>
    <div class="flex text-sm justify-center gap-x-2 flex-wrap pb-1">
      <span>{import.meta.env.PUBLIC_APP_TITLE}</span>
      <span>{import.meta.env.PUBLIC_APP_VERSION}</span>
    </div>
  </footer>
));
