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
  const [formStatus, setFormStatus] = useState({ status: 'create' });

  useEffect(() => {
    (async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    })();
  }, [devs]);

  async function handleSubmit(data, formStatus) {
      if (formStatus.status === 'create') {
        const response = await api.post('/devs', data);
        setDevs([...devs, response.data]);
      } else if (formStatus.status === 'update') {
        const response = await api.put(`/devs/${formStatus.id}`, data);
        console.log(response);
        setDevs([...devs]);
      }
  }

  return (
    <div id="app" style={{ position: 'relative' }}>
      <aside className={(formStatus.status === 'update') ? 'update-anim' : 'create-anim'}>
        <DevForm 
          onSubmit={handleSubmit} 
          formStatus={formStatus} 
          setFormStatus={setFormStatus} 
          id="dev-form"  
        />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem 
              dev={dev}
              formStatus={formStatus} 
              setFormStatus={setFormStatus}  
              key={dev._id} 
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
