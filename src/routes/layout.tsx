import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";

export const useServerVersion = routeLoader$(() => {
  return import.meta.env.PUBLIC_APP_VERSION;
});

export type HeaderMenuItem = {
  id: string;
  text: string;
  href: string;
  external?: boolean;
};
const MENU_ITEMS: HeaderMenuItem[] = [
  { id: "wizard", text: "最初から始める", href: "/" },
  { id: "about", text: "このツールについて", href: "/about" },
  {
    id: "about",
    text: "ソースコード",
    href: "https://github.com/amane-katagiri/fghi-pqrs",
    external: true,
  },
];

export default component$(() => {
  return (
    <div class="flex flex-col" style="height: 100dvh;">
      <Header menuItems={MENU_ITEMS} />
      <main class="flex-grow p-3">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      name: "description",
      content:
        "Feed Generator for HIstory of Personal QweRty Site: yet another Atom feed generator.",
    },
  ],
};
