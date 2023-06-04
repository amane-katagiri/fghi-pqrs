import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import type { WizardForm } from "~/schema/wizard";
import Textbox from "../../form/textbox";
import StepPanel from "./step-panel";

export default component$<{
  field: FieldStore<WizardForm, "feedCreated">;
  props: FieldElementProps<WizardForm, "feedCreated">;
  shown: boolean;
}>(({ field, props, shown }) => {
  return (
    <StepPanel
      description="最も古い記事の作成年を教えてください"
      error={field.error}
      shown={shown}
    >
      <div>
        <Textbox
          {...props}
          value={field.value}
          type="number"
          placeholder="YYYY"
          error={!!field.error}
        />
      </div>
    </StepPanel>
  );
});
