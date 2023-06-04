import { $, component$ } from "@builder.io/qwik";
import type {
  FieldElementProps,
  FieldStore,
  FormStore,
} from "@modular-forms/qwik";
import { focus, setValue } from "@modular-forms/qwik";

import type { WizardForm } from "~/schema/wizard";
import MetadataButton from "../../form/metadata-button";
import Textbox from "../../form/textbox";
import StepPanel from "./step-panel";

export default component$<{
  form: FormStore<WizardForm, undefined>;
  field: FieldStore<WizardForm, "feedTitle">;
  props: FieldElementProps<WizardForm, "feedTitle">;
  shown: boolean;
  siteUrl?: string;
}>(({ form, field, props, shown, siteUrl }) => {
  return (
    <StepPanel
      description="サイトのタイトルを教えてください"
      error={field.error}
      shown={shown}
    >
      <div class="flex gap-2 items-center">
        <Textbox
          {...props}
          value={field.value}
          placeholder="素敵なマイブログ..."
          error={!!field.error}
        />
        <MetadataButton
          field={field}
          url={siteUrl}
          meta="title"
          setValue={$((value?: string) => {
            setValue(form, field.name, value ?? "");
            focus(form, field.name);
          })}
        />
      </div>
    </StepPanel>
  );
});
