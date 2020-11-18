import React from 'react';
import LOGO from '@/assets/logo.png';
import './LandingPage.scss';

function LandingPage(): React.ReactElement {
  return (
    <div id="landing-page">
      <img src={LOGO} alt="site logo" />
      {/* <pre>{getFirebaseData()}</pre> */}
    </div>
  );
}

export default LandingPage;
