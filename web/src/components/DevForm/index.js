import React, { useState, useEffect } from 'react';

import './styles.css';

function DevForm({ onSubmit, status, setStatus, dev }) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [techsBadges, setTechsBadges] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    let techsString = "";
    if (techsBadges.length === 0) {
      const inputElemValue = document.querySelector("#techs").value;
      
      if (isStringAllowed(inputElemValue)) {
        techsString = inputElemValue;
      }
    } else {
      techsString = techsBadges.join(', ');
    }

    await onSubmit({
      github_username,
      techs: techsString,
      latitude,
      longitude,
    }, status);

    setGithubUsername('');
    setTechs('');
    setTechsBadges([]);
  }

  function addClassName(element, className) {
    if (element) {
      element.classList.add(className);
      element.addEventListener('animationend', (e) => {
        e.currentTarget.classList.remove(className);
      });
    }
  }

  function isStringAllowed(string, regex=/^[\w\-\s]*\w+$/) {
    return (regex.exec(string) && string.length <= 25);
  }

  function addTechBadges(e) {
    const text = e.target.value;
    const textLastCharTyped = text.split('').reverse().join('')[0];
    const textWithoutLastCharTyped = text.substring(0, text.length - 1);
    setTechs(text);

    switch (textLastCharTyped) {
      case ',':
      case ';':
        if (isStringAllowed(textWithoutLastCharTyped)) {
          if (techsBadges.indexOf(textWithoutLastCharTyped) < 0) {
            setTechsBadges([...techsBadges, textWithoutLastCharTyped]);
          } else {
            addClassName(document.querySelector(`#badge-${textWithoutLastCharTyped}`), 'increase-size');
          }
        } else {
          addClassName(document.querySelector('#techs'), 'no-no');
          addClassName(document.querySelector('#tooltip'), 'appear');
        }
        setTechs('');
        break;
      default:
        break;
    }
  }

  function removeTechBadges(techName, index) {
    const spanElem = document.querySelector(`#badge-${techName}`);
    spanElem.parentNode.parentNode.removeChild(spanElem.parentNode);
    techsBadges.splice(index, 1);
    setTechsBadges(techsBadges);
  }

  return (
    <div>
      <h1 id="dev-form-heading">{(status[0] === 'create') ? 'Cadastrar' : 'Atualizar'}</h1>
      <span 
        style={{ 
          fontSize: 12 + 'px', 
          textAlign: 'center',
          display: 'block',
        }}
      >
        {status[1]}
      </span>
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>

        <div className="input-block relative">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            value={techs}
            onChange={(e) => addTechBadges(e)}
          />
          <span id="tooltip">As tecnologias devem ser entre 3-25 caracteres e sem caracteres especiais!</span>
        </div>
        {techsBadges.map((tech, index) => (
          <div key={tech} className="tech-badge-wrapper">
            <span className="tech-badge-span" id={`badge-${tech}`}>{tech}</span>
            <button className="tech-badge-btn" onClick={() => removeTechBadges(tech, index)}>
              X
            </button>
          </div>
        ))}

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              step="any"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Latitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              step="any"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          {(status[0] === 'update') ? 
            <button 
              className="form-btn"
              onClick={() => setStatus(['create', ''])}
            >
              Cancelar
            </button> : null}
          <button type="submit" className="form-btn">Salvar</button>
        </div>

      </form>
    </div>
  )
}

export default DevForm;
