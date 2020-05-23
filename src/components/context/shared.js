import { useEffect, useContext } from "preact/hooks";

export const delay = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), 1000));

export const reducer = (state, action) => {
  console.groupCollapsed(`action received ${action.type}`);
  console.log("action", action);
  if (action.type === "effectTest") {
    Promise.resolve().then(() =>
      state.dispatch({
        type: "setMessage",
        payload: "From effect with wrapper dispatcher immediate",
      })
    );
    delay().then(() =>
      state.dispatch({
        type: "setMessage",
        payload: "From effect with wrapper dispatcher delayed",
      })
    );
  }
  const newState =
    action.type === "setMessage"
      ? { ...state, innerMessage: action.payload }
      : action.type === "enableEffects"
      ? { ...state, dispatch: action.payload }
      : state;
  console.log("new state", newState);
  console.groupEnd();
  return newState;
};

// Although it defeats the whole point of using one, and feels like a bad demo of this problem
// passing in the context means I don't need to define components again with the other context.
// It does not change behaviour as of 10.4.4 though
export const ContextMessage = ({ context }) => {
  const [{ innerMessage }, dispatch] = useContext(context);
  useEffect(() => {
    const showDelayed = (m) =>
      delay(m).then((m) => dispatch({ type: "setMessage", payload: m }));
    showDelayed("first message")
      .then(() => showDelayed("second message"))
      .then(() => delay())
      .then(() => dispatch({ type: "effectTest" }));
  }, []);
  console.log("rendering ContextMessage with message", innerMessage);
  return (
    innerMessage && (
      <div>
        <h3>ContextMessage Component</h3>
        <p>{innerMessage}</p>
      </div>
    )
  );
};

export const Wrapper = ({ context, children }) => {
  const [{ dispatch: sharedDispatch }, dispatch] = useContext(context);
  console.log("rendering Wrapper");
  useEffect(() => {
    dispatch({ type: "enableEffects", payload: dispatch });
  }, []);
  return (
    sharedDispatch && (
      <div>
        <h2>Wrapper Component</h2>
        <div>{children}</div>
      </div>
    )
  );
};
