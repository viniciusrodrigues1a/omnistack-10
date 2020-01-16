import React from 'react';

import './styles.css';

import DevActions from '../DevActions';

function DevItem({ dev, status, setStatus }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <p className="user-name">{dev.name}</p>
          <span>{dev.techs.map((tech, index) => tech + ((index < (dev.techs.length-1)) ? ', ' : '') )}</span>
        </div>
      </header>
      <p className="user-bio">{dev.bio}</p>
      <DevActions 
        dev={dev} 
        status={status} 
        setStatus={setStatus} 
      />
    </li>
  )
}

export default DevItem;
