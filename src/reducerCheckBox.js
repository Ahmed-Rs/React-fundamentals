import * as React from "react";
import CheckBox from "./CheckBox";
import "./tab.css";

// Sert à executer toutes les fonctions en param. de executeAll().
const executeAll =
  (...functions) =>
  (...args) =>
    functions.forEach((x) => x?.(...args));

const defaultReducer = (state, action) => {
  switch (action.type) {
    case "tick":
      return { checked: !state.checked };
    case "reset":
      return action.initialState;

    default: {
      throw new Error(`Action non supportée: ${action.type}`);
    }
  }
};

function useCheckBox({ intialChecked = false, reducer = defaultReducer }) {
  // Transformation de state en Objet, contenant propriété 'checked'
  const initialState = { checked: intialChecked };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { checked } = state;
  // Création des fct de dispatch
  const tick = () => dispatch({ type: "tick" });
  const reset = () => dispatch({ type: "reset", initialState });

  const getCheckBoxerProps = ({ onClick, ...props } = {}) => {
    return {
      "aria-checked": checked,
      onChange: executeAll({ onClick, tick }),
      ...props,
    };
  };

  const getResetterProps = ({ onClick, ...props } = {}) => {
    return {
      onChange: executeAll({ onClick, reset }),
      ...props,
    };
  };

  return {
    tick,
    reset,
    checked,
    getCheckBoxerProps,
    getResetterProps,
  };
}

function CheckBoxReduced() {
  const [timesChanged, setTimesChanged] = React.useState(0);
  const maxTimesChanged = timesChanged >= 4;

  // Custom Reducer
  const customReducer = (state, action) => {
    switch (action.type) {
      case "tick":
        if (maxTimesChanged) {
          return { checked: state.checked };
        } else {
          return { checked: !state.checked };
        }
      case "reset":
        return { checked: false };

      default:
        throw new Error(`Action non supportée: ${action.type}`);
    }
  };

  // Récupération des données générées via useCheckBox()
  const { checked, getCheckBoxerProps, getResetterProps } = useCheckBox({
    reducer: customReducer,
  });

  return (
    <div>
      <CheckBox
        checked={checked}
        {...getCheckBoxerProps({
          checked: checked,
          onClick: () =>
            setTimesChanged((count) => {
              count = count + 1;
            }),
        })}
      />
      {maxTimesChanged ? (
        <div>You did too many changes !</div>
      ) : timesChanged > 0 ? (
        <div>Nombre de changements : {timesChanged}</div>
      ) : null}

      <button
        {...getResetterProps({
          checked: checked,
          onClick: () => setTimesChanged(0),
        })}
      >
        reset
      </button>
    </div>
  );
}

export default CheckBoxReduced;
