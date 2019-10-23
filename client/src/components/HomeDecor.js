import React, {useState} from 'react';
import BEAR       from '../assets/bear_happy.png';
import BEAR_HOVER from '../assets/bear_mad.png';

function HomeDecor() {
    const [image, setImage] = useState(BEAR);
  
    return (
        <div className='home-decor' 
            onMouseEnter={() => setImage(BEAR_HOVER)}
            onMouseLeave={() => setImage(BEAR)}
        >
            <img src={image} alt="bear drawing"/>
        </div>
    );
  }

export default HomeDecor