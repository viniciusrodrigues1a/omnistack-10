import React from 'react';

import './styles.css';

function DevItem({ dev }) {
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
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
    </li>
  )
}

export default DevItem;
