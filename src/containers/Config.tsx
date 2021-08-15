import React, { memo, useContext, createContext } from 'react';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type ContextProps = Partial<{
  env: 'app' | 'storybook';
}>;

const Config = memo((props) => {
  return (
    <Provider
      value={{
        env: 'app',
      }}
    >
      {props.children}
    </Provider>
  );
});

export default Config;

export const useConfig = () => useContext(Context);
export const Consumer = Context.Consumer;
