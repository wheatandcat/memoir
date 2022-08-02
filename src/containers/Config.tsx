import React, { memo, useContext, createContext } from 'react';

const Context = createContext<ContextProps>({});
const { Provider } = Context;

type ContextProps = Partial<{
  env: 'app' | 'storybook';
}>;

type Props = {
  children: React.ReactNode;
};

const Config: React.FC<Props> = (props) => {
  return (
    <Provider
      value={{
        env: 'app',
      }}
    >
      {props.children}
    </Provider>
  );
};

export default memo(Config);

export const useConfig = () => useContext(Context);
