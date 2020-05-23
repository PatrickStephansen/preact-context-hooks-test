import { useReducer } from "preact/hooks";
import { createContext } from "preact";
import { reducer, ContextMessage, Wrapper } from "./shared";

const badContextDefault = {};
const BadContext = createContext({});

const Abstraction = ({ reducer, defaultState, children }) => (
  <BadContext.Provider value={useReducer(reducer, defaultState)}>
    <Wrapper context={BadContext}>{children}</Wrapper>
  </BadContext.Provider>
);

export const BrokenContext = () => (
  <Abstraction reducer={reducer} defaultState={badContextDefault}>
    <ContextMessage context={BadContext} />
  </Abstraction>
);
