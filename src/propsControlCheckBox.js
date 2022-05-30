import * as React from "react";
import CheckBox from "./CheckBox";
import "./tab.css";
import { defaultReducer, useCheckBox } from "./reducerCheckBox";

function SuperCheckBox({ checked: controlledChecked, onChange }) {
  const { checked, getCheckBoxerProps } = useCheckBox({
    checked: controlledChecked,
    onChange,
  });
  const props = getCheckBoxerProps({ checked });
  return <CheckBox {...props} />;
}

function PropsControledCheckbox() {
  const [allChecked, setAllChecked] = React.useState(false);
  const handleStateChange = (state) => {
    setAllChecked(state.checked);
  };
  return (
    <div>
      <SuperCheckBox checked={allChecked} onChange={handleStateChange} />
      <SuperCheckBox checked={allChecked} onChange={handleStateChange} />
      <SuperCheckBox checked={allChecked} onChange={handleStateChange} />
    </div>
  );
}

export default PropsControledCheckbox;
