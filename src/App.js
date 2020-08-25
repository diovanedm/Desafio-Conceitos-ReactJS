import React, { useEffect } from "react";
import api from './services/api'

import "./styles.css";
import { useState } from 'react';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    // setProjects([...projects, `Novo projeto ${ Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Diovane Maia"
    });

    const project = response.data;

    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`projects/${id}`);

    const data = repositories.filter(project => project.id !== id)
    
    setRepositories(data);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
