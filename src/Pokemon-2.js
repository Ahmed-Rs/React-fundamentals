import * as React from "react";
import CheckBox from "./CheckBox";
import "./tab.css";
// import { default as TabsComponent } from "./tab";

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
// Dans cette nouvelle configuration, avec COMPOSNTS IMBRIQUES, on s'est passé du './tab.js'
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
  const {selectedTabId} = useTabs();
  return panelId === selectedTabId ? <div {...props}>{children}</div> : null;
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
    </div>
  );
}

export default PokemonApp2;
