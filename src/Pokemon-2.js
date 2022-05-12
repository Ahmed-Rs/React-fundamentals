import * as React from "react";
import CheckBox from "./CheckBox";
import { default as TabsComponent } from "./tab";

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

// TABS
const options = [
  { title: "London", display: "London is the capital city of England." },
  { title: "Paris", display: "Paris is the capital of France." },
  { title: "Tokyo", display: "Tokyo is the capital of Japan." },
];

function CompounedTab({ children }) {
  const [selectedTabId, setSelectedTabId] = React.useState(0);
  const selectTab = (id) => setSelectedTabId(id);

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      selectTab: selectTab,
    })
  );
}

function London({ selectedTabId, children }) {
  return selectedTabId === 0 ? <div>{children}</div> : null;
}

function Paris({ selectedTabId, children }) {
  return selectedTabId === 1 ? <div>{children}</div> : null;
}

function Tokyo({ selectedTabId, children }) {
  return selectedTabId === 2 ? <div>{children}</div> : null;
}

function Tabs({ selectedTabId, selectTab, ...props }) {
  return (
    <TabsComponent selected={selectedTabId} onChange={selectTab} {...props} />
  );
}

// EXPORT FUNCTION
function PokemonApp2() {
  return (
    <div>
      <CompounedComponentParent>
        <CheckBoxButton />
        <Accept>✅ Accepter les termes du contrat</Accept>
        <Decline>❌ Décliner les termes du contrat</Decline>
      </CompounedComponentParent>

      <CompounedTab>
        <Tabs tabs={options} />
        <London>Inscription pour aller à Londres</London>
        <Paris>Inscription pour aller à Paris</Paris>
        <Tokyo>Inscription pour aller à Tokyo</Tokyo>
      </CompounedTab>
    </div>
  );
}

export default PokemonApp2;
