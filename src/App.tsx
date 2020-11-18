import React from 'react';
import LandingPage from '@/components/LandingPage';
// import { getFirebaseData } from './services/auth';

function App(): React.ReactElement {
  return (
    <div className="App">
      <LandingPage />
      {/* <pre>{getFirebaseData()}</pre> */}
    </div>
  );
}

export default App;
