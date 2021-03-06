import React from 'react';
import { RecoilRoot } from 'recoil';
import WithProvider from './WithProvider';

function App() {
  return (
    <RecoilRoot>
      <WithProvider />
    </RecoilRoot>
  );
}

export default App;
