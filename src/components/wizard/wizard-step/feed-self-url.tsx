import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import type { WizardForm } from "~/schema/wizard";
import Textbox from "../../form/textbox";
import StepPanel from "./step-panel";

export default component$<{
  field: FieldStore<WizardForm, "feedSelfUrl">;
  props: FieldElementProps<WizardForm, "feedSelfUrl">;
  shown: boolean;
}>(({ field, props, shown }) => {
  return (
    <StepPanel
      description="フィードを配置するURLが決まっていれば教えてください"
      error={field.error}
      shown={shown}
    >
      <div>
        <Textbox
          {...props}
          value={field.value}
          placeholder="https://example.com/..."
          error={!!field.error}
        />
      </div>
    </StepPanel>
  );
});
