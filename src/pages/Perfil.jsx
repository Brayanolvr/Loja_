import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Favorite, ExitToApp, AddAPhoto } from '@mui/icons-material';
import Navbar from "../components/NavBar";
const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Favoritos');
  const [profileImage, setProfileImage] = useState('');

  const handleTabClick = useCallback((tab) => {
    setSelectedTab(tab);
  }, [setSelectedTab]);

  const uploadProfileImage = async (event) => {
    try {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append('upload_preset', 'it9xzzmf');

      const response = await axios.post('https://api.cloudinary.com/v1_1/dyumqvquz/image/upload', formData);

      const imageUrl = response.data.secure_url;
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    }
  };

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('profileImage');
    if (storedImageUrl) {
      setProfileImage(storedImageUrl);
    }
  }, []);

  const iconStyle = {
    fontSize: '40px',
    marginRight: '20px',
    color: selectedTab === 'Favoritos' ? '#FFFFFF' : 'corPadrao',
  };

  const iconContainerStyle = {
    display: 'flex',
    marginTop: '250px',
  };

  const photoIconStyle = {
    fontSize: '40px',
    color: '#FFFFFF', // Alterado para branco
    cursor: 'pointer',
  };

  return (
    <div>
      <Navbar />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ 
        width: '400px', 
        height: '500px', 
        borderRadius: '15px', 
        background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(71,18,18,1) 100%)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <img src={profileImage || 'caminho/para/imagem/do/usuario.jpg'} alt="Foto de Perfil do Usuário" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <label htmlFor="upload-photo" style={{ cursor: 'pointer' }}>
              <AddAPhoto style={photoIconStyle} />
            </label>
            <input id="upload-photo" type="file" onChange={uploadProfileImage} style={{ display: 'none' }} />
          </div>
          <div style={iconContainerStyle}>
            <Favorite onClick={() => handleTabClick('Favoritos')} style={iconStyle} />
            <ExitToApp onClick={() => handleTabClick('Sair')} style={iconStyle} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfileScreen;
