import * as React from "react";
import CheckBox from "./CheckBox";
import CheckBoxReduced from "./reducerCheckBox";
import "./tab.css";
import PropsControledCheckbox from "./propsControlCheckBox";
// import { default as TabsComponent } from "./tab";

// CHECKBOX
// Compouned Component
function CompounedComponentParent({ children }) {
  const [checked, setChecked] = React.useState(false);
  const tick = () => setChecked(!checked);
  // Clônage
  // Dans une fct fléchée, ne pas mettre d'accolades après la flèche sauf si on ajoute un return
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
// Dans cette nouvelle configuration, avec COMPOSANTS IMBRIQUES, on s'est passé du './tab.js'
// Ajout d'un Context pour alléger la transmission des props

const TabsContext = React.createContext();

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(
      "useTabs s'utilise dans un composant <Tabs /> car contient le Provider!"
    );
  }
  return context;
}

function CompounedTab({ children, ...props }) {
  const [selectedTabId, setSelectedTabId] = React.useState(0);
  const selectTab = (id) => setSelectedTabId(id);

  // Passage des props via Context
  return (
    <TabsContext.Provider value={{ selectedTabId, selectTab }}>
      <div className="tabs" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// Suppression des props passé via Context
function TabList({ children, ...props }) {
  const clones = React.Children.map(children, (child, tabId) =>
    React.cloneElement(child, {
      tabId: tabId,
      ...props,
    })
  );
  return (
    <div className="tab" {...props}>
      {clones}
    </div>
  );
}

// Injection des props selectedTabId, selectTab via Context
function Tab({ tabId, children }) {
  const { selectedTabId, selectTab } = useTabs();
  return (
    <button
      key={children}
      className={selectedTabId === tabId ? "tablinks active" : "tablinks"}
      onClick={(e) => selectTab(tabId)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return React.Children.map(children, (child, panelId) =>
    React.cloneElement(child, {
      panelId: panelId,
      className: "tabcontent",
    })
  );
}

function Panel({ children, panelId, ...props }) {
  const { selectedTabId } = useTabs();
  return panelId === selectedTabId ? <div {...props}>{children}</div> : null;
}

// CheckBox via Aria
function useAriaCheckBox() {
  const [checked, setChecked] = React.useState(false);
  const tick = (e) => setChecked(!checked); // Obligation de mettre cette expression en fct fléchée car sinon: Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // En effet, la page fera appel tout le temps à tick(), ce qui fait trop de render, alors qu'en mettant cela en fct fléchée, le tick() ne sera appelé que lorsqu'il y'aura un onClick ou onChange pour le déclencher

  return {
    checked,
    tick,
    checkBoxProps: {
      role: "checkbox",
      "aria-checked": checked,
      onClick: tick,
      onChange: tick,
    },
  };
}

function AriaCheckBox() {
  const { checked, checkBoxProps } = useAriaCheckBox();
  return (
    <div>
      <CheckBox checked={checked} {...checkBoxProps} />
      <button aria-label="checkbox-personnalise" {...checkBoxProps}>
        {checked ? "✅" : "❌"}
      </button>
    </div>
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
        <TabList>
          <Tab>London</Tab>
          <Tab>Paris</Tab>
          <Tab>tokyo</Tab>
        </TabList>
        <TabPanels>
          <Panel>Inscription pour aller à Londres</Panel>
          <Panel>Inscription pour aller à Paris</Panel>
          <Panel>Inscription pour aller à Tokyo</Panel>
        </TabPanels>
        <small>Hello World, Composant Enfant Autre</small>
      </CompounedTab>
      <AriaCheckBox />
      <CheckBoxReduced />
      <PropsControledCheckbox />
    </div>
  );
}

export default PokemonApp2;
