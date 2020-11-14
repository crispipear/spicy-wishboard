import React from 'react';
import LOGO from './assets/logo.png';
// import { getFirebaseData } from './services/auth';

function App(): React.ReactElement {
  return (
    <div className="App">
      <img src={LOGO} alt="site logo" />
      {/* <pre>{getFirebaseData()}</pre> */}
    </div>
  );
}

export default App;
