import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  $,
  Fragment,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { FormStore, InitialValues } from "@modular-forms/qwik";
import { focus } from "@modular-forms/qwik";
import { useForm, validate, zodForm$ } from "@modular-forms/qwik";
import {
  HiCheckSolid,
  HiArrowSmallRightSolid,
  HiArrowUturnLeftSolid,
} from "@qwikest/icons/heroicons";

import type { WizardForm } from "~/schema/wizard";
import { wizardFormSchema } from "~/schema/wizard";
import FeedAlterUrlField from "~/components/wizard/wizard-step/feed-alter-url";
import FeedSelfUrlField from "~/components/wizard/wizard-step/feed-self-url";
import FeedTitleField from "~/components/wizard/wizard-step/feed-title";
import FeedAuthorField from "~/components/wizard/wizard-step/feed-author";
import FeedCreatedField from "~/components/wizard/wizard-step/feed-created";
import { match } from "ts-pattern";

export const useRouteLoader = routeLoader$<InitialValues<WizardForm>>(
  (requestEvent) => {
    const step = Number(requestEvent.url.searchParams.get("step") ?? "0");
    return {
      step: Number.isNaN(step) ? 0 : step,
      feedAlterUrl: requestEvent.url.searchParams.get("feed-alter-url") ?? "",
      feedSelfUrl: requestEvent.url.searchParams.get("feed-self-url") ?? "",
      feedTitle: requestEvent.url.searchParams.get("feed-title") ?? "",
      feedAuthor: requestEvent.url.searchParams.get("feed-author") ?? "",
      feedCreated: requestEvent.url.searchParams.get("feed-created") ?? "",
    };
  }
);

const getStateParams = (
  values: FormStore<WizardForm, undefined>,
  step: number
) =>
  new URLSearchParams(
    [
      ["step", step],
      ["feed-alter-url", values.internal.fields.feedAlterUrl?.value],
      ["feed-self-url", values.internal.fields.feedSelfUrl?.value],
      ["feed-title", values.internal.fields.feedTitle?.value],
      ["feed-author", values.internal.fields.feedAuthor?.value],
      ["feed-created", values.internal.fields.feedCreated?.value],
    ].filter<string[]>((p): p is string[] => p[1] != null)
  );

const getFeedUrl = (values: FormStore<WizardForm, undefined>) =>
  `/feed?${new URLSearchParams(
    [
      ["feed-alter-url", values.internal.fields.feedAlterUrl?.value],
      ["feed-self-url", values.internal.fields.feedSelfUrl?.value],
      ["feed-title", values.internal.fields.feedTitle?.value],
      ["feed-author", values.internal.fields.feedAuthor?.value],
      ["feed-created", values.internal.fields.feedCreated?.value],
    ].filter<string[]>((p): p is string[] => p[1] != null)
  )}`;

const WIZARD_STEP: readonly (keyof Omit<WizardForm, "step">)[] = [
  "feedAlterUrl",
  "feedTitle",
  "feedAuthor",
  "feedCreated",
  "feedSelfUrl",
] as const;
const WIZARD_STEP_LABEL: { [K in (typeof WIZARD_STEP)[number]]: string } = {
  feedAlterUrl: "サイトURL",
  feedSelfUrl: "フィードURL",
  feedTitle: "サイトタイトル",
  feedAuthor: "サイト作者",
  feedCreated: "フィード作成年",
} as const;
const WIZARD_MAX_STEP = WIZARD_STEP.length;

const StepButton = ({
  error,
  current,
}: {
  error?: boolean;
  current: boolean;
}) => (
  <>
    <span class="relative flex h-3 w-3">
      <span
        class={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
          error ? "animate-ping bg-error" : "bg-success"
        }`}
      ></span>
      <span
        class={`relative inline-flex rounded-full h-3 w-3 ${
          error ? "bg-error" : current ? "bg-primary" : "bg-success"
        }`}
      ></span>
    </span>
  </>
);

export default component$(() => {
  const [wizardForm, { Form, Field }] = useForm<WizardForm, undefined>({
    loader: useRouteLoader(),
    validate: zodForm$(wizardFormSchema),
    validateOn: "touched",
    revalidateOn: "touched",
  });

  const stepCount = useSignal(wizardForm.internal.fields.step?.value ?? 0);

  const navigate = useNavigate();
  const updateUrlParams = $(() =>
    navigate(`?${getStateParams(wizardForm, stepCount.value)}`)
  );

  useVisibleTask$(({ track }) =>
    track(() => focus(wizardForm, WIZARD_STEP[stepCount.value]))
  );

  return (
    <div class="flex flex-col justify-center items-center h-full mx-auto w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
      <Form class="w-full flex flex-col h-[360px] bg-white shadow-md p-4 rounded-md gap-2">
        {stepCount.value < WIZARD_MAX_STEP && (
          <div class="flex justify-end">
            <a class="text-primary hover:underline text-sm" href="/feed">
              入力をスキップ
            </a>
          </div>
        )}
        <div class="w-full flex-grow flex items-center">
          {WIZARD_STEP.map((key) =>
            match(key)
              .with("feedAlterUrl", () => (
                <Field key={"feedAlterUrl"} name={"feedAlterUrl"}>
                  {(field, props) => (
                    <FeedAlterUrlField
                      shown={stepCount.value === 0}
                      field={field}
                      props={props}
                    />
                  )}
                </Field>
              ))
              .with("feedTitle", () => (
                <Field key={"feedTitle"} name={"feedTitle"}>
                  {(field, props) => (
                    <FeedTitleField
                      shown={stepCount.value === 1}
                      field={field}
                      props={props}
                    />
                  )}
                </Field>
              ))
              .with("feedAuthor", () => (
                <Field key={"feedAuthor"} name={"feedAuthor"}>
                  {(field, props) => (
                    <FeedAuthorField
                      shown={stepCount.value === 2}
                      field={field}
                      props={props}
                    />
                  )}
                </Field>
              ))
              .with("feedCreated", () => (
                <Field key={"feedCreated"} name={"feedCreated"}>
                  {(field, props) => (
                    <FeedCreatedField
                      shown={stepCount.value === 3}
                      field={field}
                      props={props}
                    />
                  )}
                </Field>
              ))
              .with("feedSelfUrl", () => (
                <Field key={"feedSelfUrl"} name={"feedSelfUrl"}>
                  {(field, props) => (
                    <FeedSelfUrlField
                      shown={stepCount.value === 4}
                      field={field}
                      props={props}
                    />
                  )}
                </Field>
              ))
              .exhaustive()
          )}
          {stepCount.value >= WIZARD_MAX_STEP && (
            <div class="w-full">
              <div class="mb-8">こちらでフィードの作成をはじめますか？</div>
              <div class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-6">
                {WIZARD_STEP.map((key, i) => (
                  <Fragment key={key}>
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        key={key}
                        disabled={stepCount.value === i}
                        onClick$={async () => {
                          stepCount.value = i;
                          updateUrlParams();
                        }}
                      >
                        <StepButton
                          error={!!wizardForm.internal.fields[key]?.error}
                          current={stepCount.value === i}
                        />
                      </button>
                      <div
                        class={`whitespace-nowrap font-bold${
                          wizardForm.internal.fields[key]?.error
                            ? " text-error"
                            : ""
                        }`}
                      >
                        {WIZARD_STEP_LABEL[key]}
                      </div>
                    </div>
                    <div
                      class={`overflow-ellipsis overflow-hidden whitespace-nowrap${
                        wizardForm.internal.fields[key]?.error
                          ? " text-error"
                          : ""
                      }`}
                    >
                      {wizardForm.internal.fields[key]?.value
                        ? wizardForm.internal.fields[key]?.value
                        : "（設定なし）"}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
        <div class="flex justify-between items-end flex-wrap gap-2">
          {stepCount.value >= WIZARD_MAX_STEP ? (
            <div>
              <button
                type="button"
                onClick$={async () => {
                  stepCount.value = 0;
                  updateUrlParams();
                }}
                class="flex items-center justify-center border border-primary hover:border-primary-hover text-primary hover:text-primary-hover w-12 h-12 rounded-full"
              >
                <HiArrowUturnLeftSolid class="h-6 w-6" />
              </button>
            </div>
          ) : (
            <div class="flex gap-3 items-center">
              {WIZARD_STEP.map((key, i) => (
                <button
                  type="button"
                  key={key}
                  disabled={stepCount.value === i}
                  onClick$={() => {
                    stepCount.value = i;
                    updateUrlParams();
                  }}
                >
                  <StepButton current={stepCount.value === i} />
                </button>
              ))}
            </div>
          )}
          <div>
            <button
              type="submit"
              onClick$={async () => {
                if (
                  !(await validate(wizardForm, WIZARD_STEP[stepCount.value]))
                ) {
                  return;
                }
                stepCount.value = stepCount.value + 1;
                if (stepCount.value <= WIZARD_MAX_STEP) {
                  updateUrlParams();
                } else {
                  navigate(getFeedUrl(wizardForm));
                }
              }}
              class="flex items-center justify-center bg-primary text-white hover:bg-primary-hover w-12 h-12 rounded-full"
            >
              {stepCount.value < WIZARD_MAX_STEP ? (
                <HiArrowSmallRightSolid class="h-6 w-6" />
              ) : (
                <HiCheckSolid class="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "無料フィード作成",
  };
};
