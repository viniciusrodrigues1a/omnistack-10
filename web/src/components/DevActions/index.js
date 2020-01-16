import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import api from '../../services/api';

import './styles.css';
import deleteIcon from '../../assets/images/delete-icon.png';
import updateIcon from '../../assets/images/update-icon.png';

function DevActions({ dev, setFormStatus }) {
  async function handleDeleteButton(id) {
    await api.delete(`/devs/${id}`)
  }

  return (
    <div className="dev-actions">
      <a 
        href={`https://github.com/${dev.github_username}`} 
      >
        Acessar perfil no GitHub
      </a>
      <div>
        <OverlayTrigger
          placement="bottom-start"
          delay={{ show: 150, hide: 150 }}
          overlay={
            <Tooltip id='tooltip-update' className="tooltip">
              Atualizar as informações do Dev.
            </Tooltip>
          }
          >
          <img 
            className="dev-action-img" 
            src={updateIcon} 
            alt="Update"
            onClick={() => {
              setFormStatus({ 
                status: 'update', 
                name: dev.name, 
                id: dev._id,
              });
            }}

          />
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom-start"
          delay={{ show: 150, hide: 150 }}
          overlay={
            <Tooltip id='tooltip-update' className="tooltip">
                Deleter as informações do Dev.
            </Tooltip>
          }
        >
          <img 
            className="dev-action-img" 
            src={deleteIcon} 
            alt="Delete"
            onClick={() => {
              handleDeleteButton(dev._id);
              setFormStatus({ status: 'create' });
            }}
          />
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default DevActions;
