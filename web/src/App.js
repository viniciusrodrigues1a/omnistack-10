import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App() {
  const [devs, setDevs] = useState([]);
  const [formStatus, setFormStatus] = useState(['create', '']);

  useEffect(() => {
    (async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    })();
  }, [devs]);

  async function handleSubmit(data, status) {
      if (status[0] === 'create') {
        const response = await api.post('/devs', data);
        setDevs([...devs, response.data]);
      } else if (status[0] === 'update') {
        let id = status[2];
        console.log(id)
        const response = await api.put(`/devs/${id}`, data);
        console.log(response);
        setDevs([...devs]);
      }
  }

  return (
    <div id="app" style={{ position: 'relative' }}>
      <aside className={(formStatus[0] === 'update') ? 'update-anim' : 'create-anim'}>
        <DevForm 
          onSubmit={handleSubmit} 
          status={formStatus} 
          setStatus={setFormStatus} 
          id="dev-form"  
        />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem 
              dev={dev}
              status={formStatus} 
              setStatus={setFormStatus}  
              key={dev._id} 
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
