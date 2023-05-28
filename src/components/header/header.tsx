import { $, component$, useSignal } from "@builder.io/qwik";
import { HiBars3Solid } from "@qwikest/icons/heroicons";
import { AppLogo } from "../icons/logo";
import type { HeaderMenuItem } from "~/routes/layout";

export default component$<{ menuItems: HeaderMenuItem[] }>(({ menuItems }) => {
  const isMenuOpened = useSignal(false);
  const toggleMenu = $(() => {
    isMenuOpened.value = !isMenuOpened.value;
  });
  const closeMenu = $(() => {
    isMenuOpened.value = false;
  });

  return (
    <header>
      {isMenuOpened.value && (
        <div
          onClick$={toggleMenu}
          class="fixed block w-full h-full opacity-50 bg-primary-dark md:hidden"
        ></div>
      )}
      <nav
        class={`overflow-x-auto fixed w-full flex items-center justify-between flex-wrap px-3 md:px-3 gap-y-4 md:gap-x-6 bg-primary-light`}
      >
        <div
          class={`${
            isMenuOpened.value ? "border-b border-primary-dark " : ""
          }md:border-none flex w-full md:w-auto items-center gap-4 md:gap-x-6 justify-between`}
        >
          <div class="flex items-center flex-shrink-0 h-14">
            <div class="flex items-center gap-1 text-primary">
              <AppLogo size={40} />
              <span class="text-xl tracking-tight">
                {import.meta.env.PUBLIC_APP_TITLE}
              </span>
            </div>
          </div>
          <div class="block md:hidden">
            <button
              class="flex items-center text-primary-dark hover:text-primary"
              onClick$={toggleMenu}
            >
              <HiBars3Solid class="w-8 h-8" />
            </button>
          </div>
        </div>
        <div
          class={`${
            isMenuOpened.value ? "w-full flex flex-grow" : "hidden"
          } md:flex md:flex-grow md:items-center md:w-auto pb-4 md:pb-0`}
        >
          <div class="flex text-sm flex-col md:flex-row md:flex-grow gap-x-8 gap-y-4">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick$={closeMenu}
                target={item.external ? "_blank" : undefined}
                class="block whitespace-nowrap md:inline-block text-primary-dark hover:text-primary"
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div class="h-14"></div>
    </header>
  );
});
