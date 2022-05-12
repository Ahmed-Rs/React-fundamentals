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
function CompounedTab({ children, ...props }) {
  const [selectedTabId, setSelectedTabId] = React.useState(0);
  const selectTab = (id) => setSelectedTabId(id);
  
  // On teste le type du child avant de décider de clôner afin de ne pas avoir de warning
  const clones = React.Children.map(children, (child) =>
    { return typeof child.type === "string"
      ? child
      : React.cloneElement(child, {
          selectedTabId: selectedTabId,
          selectTab: selectTab,
        })}
  );

  return (
    <div className="tabs" {...props}>
      {clones}
    </div>
  )
}

function TabList({ selectedTabId, selectTab, children, ...props }) {
  const clones = React.Children.map(children, (child, tabId) =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      selectTab: selectTab,
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

function Tab({ selectedTabId, selectTab, tabId, children }) {
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

function TabPanels({ selectedTabId, children }) {
  return React.Children.map(children, (child, panelId) =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      panelId: panelId,
      className: "tabcontent",
    })
  );
}

// Les id tabId (donc selectedTabId) et panelId sont égaux automatiquement car dans PokemonApp2, on a déclaré les noms des villes et les inscription dans ces villes dans le même ordre. Pour s'en rendre compte on peut inverser les positions de deux <Panel /> par ex.
function Panel({ selectedTabId, children, panelId, ...props }) {
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
