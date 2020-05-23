import { useEffect, useContext } from "preact/hooks";

export const delay = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), 5000));

export const reducer = (state, action) => {
  console.groupCollapsed(`action received ${action.type}`);
  console.log("action", action);
  const newState =
    action.type === "setMessage"
      ? { ...state, innerMessage: action.payload }
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
    dispatch({
      type: "setMessage",
      payload: "should show immediately (synchronous change works)",
    });
    delay("should show later (asynchronous change works)").then((message) =>
      dispatch({ type: "setMessage", payload: message })
    );
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

export const Wrapper = ({ children }) => {
  console.log("rendering Wrapper");

  return (
    <div>
      <h2>Wrapper Component</h2>
      <div>{children}</div>
    </div>
  );
};
