import { useReducer } from "preact/hooks";
import { createContext } from "preact";
import { reducer, ContextMessage, Wrapper } from "./shared";

const goodContextDefault = {};
const GoodContext = createContext({});

export const WorkingContext = () => (
  <div>
    <p>As you can see, the messages are rendered below</p>
    <GoodContext.Provider value={useReducer(reducer, goodContextDefault)}>
      <Wrapper context={GoodContext}>
        <ContextMessage context={GoodContext} />
      </Wrapper>
    </GoodContext.Provider>
  </div>
);
