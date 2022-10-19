import React, { memo, useContext, createContext } from 'react';

const Context = createContext<ContextProps>({});
const { Provider } = Context;

type Props = {
  children: React.ReactNode;
};

type ContextProps = Partial<{
  env: 'app' | 'storybook';
}>;

const Config: React.FC<Props> = memo((props) => {
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
