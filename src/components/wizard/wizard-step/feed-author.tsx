import { component$ } from "@builder.io/qwik";
import type { FieldElementProps, FieldStore } from "@modular-forms/qwik";
import type { WizardForm } from "~/schema/wizard";
import Textbox from "../../form/textbox";
import StepPanel from "./step-panel";

export default component$<{
  field: FieldStore<WizardForm, "feedAuthor">;
  props: FieldElementProps<WizardForm, "feedAuthor">;
  shown: boolean;
}>(({ field, props, shown }) => {
  return (
    <StepPanel
      description="サイトの作者名を教えてください"
      error={field.error}
      shown={shown}
    >
      <div>
        <Textbox
          {...props}
          value={field.value}
          placeholder="あなたの名前..."
          error={!!field.error}
        />
      </div>
    </StepPanel>
  );
});
