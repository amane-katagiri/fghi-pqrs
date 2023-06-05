import type { Signal } from "@builder.io/qwik";
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";

export const useServerVersion = routeLoader$(() => {
  return import.meta.env.PUBLIC_APP_VERSION;
});

export const NotifierContext =
  createContextId<Signal<string[]>>("notifier-context");

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
  const notifyQueue = useSignal([]);
  useContextProvider(NotifierContext, notifyQueue);

  useTask$(({ track, cleanup }) => {
    track(() => notifyQueue.value);
    const id = setTimeout(
      () => (notifyQueue.value = notifyQueue.value.slice(1)),
      3000
    );
    cleanup(() => clearTimeout(id));
  });
  return (
    <div class="flex flex-col" style="height: 100dvh;">
      <Header menuItems={MENU_ITEMS} />
      <main class="flex-grow p-3">
        <Slot />
      </main>
      <Footer />
      {notifyQueue.value[0] && (
        <div class="w-full fixed flex justify-center px-2 py-4 bottom-0 text-white bg-error animate-slide-in-right">
          {notifyQueue.value[0]}
        </div>
      )}
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
