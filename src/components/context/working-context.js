import { useReducer } from "preact/hooks";
import { createContext } from "preact";
import { reducer, ContextMessage, Wrapper } from "./shared";

const goodContextDefault = {};
const GoodContext = createContext({});

export const WorkingContext = () => (
  <GoodContext.Provider value={useReducer(reducer, goodContextDefault)}>
    <Wrapper>
      <ContextMessage context={GoodContext} />
    </Wrapper>
  </GoodContext.Provider>
);
