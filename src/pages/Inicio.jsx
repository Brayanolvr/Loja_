import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
const Inicio = () => {
  const [useState, setUseState] = React.useState([]);

  async function getPosts() {
    const response = await fetch('https://localhost:5000/posts');
    const data = await response.json();
    setUseState(data);
  }

  useEffect(() => {
    getPosts();
  }
    , []);

  return (
    <div>
     <Navbar /> 
      <button onClick={getPosts}>Get Posts</button>
      {useState.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <h3>{post.description}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      <h1>Inicio page</h1>
    </div>
  );
};

export default Inicio;