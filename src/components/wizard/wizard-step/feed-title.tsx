import { $, component$ } from "@builder.io/qwik";
import type {
  FieldElementProps,
  FieldStore,
  FormStore,
} from "@modular-forms/qwik";
import { validate } from "@modular-forms/qwik";

import type { WizardForm } from "~/schema/wizard";
import StepPanel from "./step-panel";
import Textbox from "../../form/textbox";
import MetadataButton from "../../form/metadata-button";

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
          afterFetch={$(async () => {
            await validate(form, field.name);
          })}
        />
      </div>
    </StepPanel>
  );
});
