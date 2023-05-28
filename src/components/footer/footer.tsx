import { component$ } from "@builder.io/qwik";
import { useServerVersion } from "~/routes/layout";

export default component$(() => {
  const serverVersion = useServerVersion();

  const isVersionMismatched =
    serverVersion.value !== import.meta.env.PUBLIC_APP_VERSION;

  return (
    <footer>
      <div class="flex text-sm justify-center gap-x-2 flex-wrap pb-1">
        <span>{import.meta.env.PUBLIC_APP_TITLE}</span>
        <span class={isVersionMismatched ? "text-error" : ""}>
          c-{import.meta.env.PUBLIC_APP_VERSION}
        </span>
        <span class={isVersionMismatched ? "text-error" : ""}>
          s-{serverVersion.value}
        </span>
      </div>
    </footer>
  );
});
