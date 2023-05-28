import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import type { WizardForm } from "~/schema/wizard";
import StepPanel from "./step-panel";
import Textbox from "../../form/textbox";

export default component$<{
  field: FieldStore<WizardForm, "feedTitle">;
  props: FieldElementProps<WizardForm, "feedTitle">;
  shown: boolean;
}>(({ field, props, shown }) => {
  return (
    <StepPanel
      description="サイトのタイトルを教えてください"
      error={field.error}
      shown={shown}
    >
      <div>
        <Textbox
          {...props}
          value={field.value}
          placeholder="素敵なマイブログ..."
          error={!!field.error}
        />
      </div>
    </StepPanel>
  );
});
