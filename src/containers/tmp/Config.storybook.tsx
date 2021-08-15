import React, { memo, useContext, createContext } from 'react';

const Context = createContext<ContextProps>({});
const { Provider } = Context;

type ContextProps = Partial<{
  env: 'app' | 'storybook';
}>;

const Config = memo((props) => {
  return (
    <Provider
      value={{
        env: 'storybook',
      }}
    >
      {props.children}
    </Provider>
  );
});

export default Config;

export const useConfig = () => useContext(Context);
