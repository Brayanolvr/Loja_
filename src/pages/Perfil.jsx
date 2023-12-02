import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Favorite, ExitToApp, AddAPhoto } from '@mui/icons-material';
import Navbar from "../components/NavBar";

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Favoritos');
  const [profileImage, setProfileImage] = useState('');
  const [profileInfo, setProfileInfo] = useState([]);

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

  async function setProfile() {
    try {
      const { data } = await axios.get("https://localhost:3000/auth/authenticate");
      setProfileInfo(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  const iconStyle = {
    fontSize: '40px',
    marginRight: '20px',
    color: selectedTab === 'Favoritos' ? '#FFFFFF' : 'corPadrao',
  };

  const iconContainerStyle = {
    display: 'flex',
    marginTop: '60%',
  };

  const photoIconStyle = {
    fontSize: '150%',
    color: '#FFFFFF',
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const cardStyle = {
    width: '22%',
    borderRadius: '5%',
    background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(71,18,18,20) 40%)',
    zIndex: 1,
    marginTop: '-17vh',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: "20vh",
    backgroundColor: '#fffaf7',  
  };

  const imageContainerStyle = {
    marginBottom: '1%',
    position: 'relative',
    width: '11vh',
    height: '11vh',
    overflow: 'hidden',
    borderRadius: '50%',
    left: '12%',
    transform: 'translate(-50%, -50%)',
    top: '20%',
  };

  const labelStyle = {
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <div className="card" style={cardStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={imageContainerStyle}>
              <img
                className="profile-image"
                src={profileImage || 'caminho/para/imagem/do/usuario.jpg'}
                alt="Foto de Perfil do Usuário"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <label htmlFor="upload-photo" style={labelStyle}>
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
