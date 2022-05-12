import * as React from "react";
import CheckBox from "./CheckBox";

// CHECKBOX 
// Compouned Component
function CompounedComponentParent({ children }) {
  const [checked, setChecked] = React.useState(false);
  const tick = () => setChecked(!checked);

  // Clônage
  // Dans une fct flèchée, ne pas mettre d'accolades après la flèche sauf si on ajoute un return
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { checked: checked, tick: tick })
  );
}

// Accepter les props
function Accept({ children, checked }) {
  return checked ? <div>{children}</div> : null;
}

function Decline({ children, checked }) {
  return checked ? null : <div>{children}</div>;
}

function CheckBoxButton({ checked, tick, ...props }) {
  return <CheckBox checked={checked} onChange={tick} {...props} />;
}

function PokemonApp2() {
  return (
    <div>
      <CompounedComponentParent>
        <CheckBoxButton />
        <Accept>✅ Accepter les termes du contrat</Accept>
        <Decline>❌ Décliner les termes du contrat</Decline>
      </CompounedComponentParent>
      <CompounedComponentParent>
        <CheckBoxButton />
        <Accept>✅ Accepter les termes du contrat</Accept>
        <Decline>❌ Décliner les termes du contrat</Decline>
      </CompounedComponentParent>
    </div>
  );
}

export default PokemonApp2;
