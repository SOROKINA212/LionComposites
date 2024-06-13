import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const PageContainer = styled.div`
  background-color: #1A1A1A;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditProfileContainer = styled.div`
  background-color: #353333;
  border-radius: 20px;
  padding: 2%;
  width: 50%;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
  margin-bottom: 4%;
  margin-top: 3%;
`;

const FormTitle = styled.h2`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 2.5vw;
  color: #F0F0F0;
  margin-bottom: 2%;
   text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 2%;
`;

const Label = styled.label`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.2vw;
  color: #F0F0F0;
  display: block;
  margin-bottom: 1.5%;
`;

const Input = styled.input`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.2vw;
  color: #1A1A1A;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
`;

const SubmitButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 1.2vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #D0D0D0;
    color: #1A1A1A;
  }
`;

const EditProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    second_name: '',
    phone_number: '',
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://localhost:8000/api/current_user/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          const currentUser = response.data;
          setUser({ isAuthenticated: true, ...currentUser });
          setFormData({
            username: currentUser.username,
            email: currentUser.email,
            name: currentUser.name,
            second_name: currentUser.second_name,
            phone_number: currentUser.phone_number,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, [setUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:8000/api/users/${user.id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUser(response.data);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <PageContainer>
      <Header />
      <SubHeader />
      <MainContent>
        <EditProfileContainer>
          <FormTitle>Редактировать профиль</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Имя</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="second_name">Фамилия</Label>
              <Input
                type="text"
                id="second_name"
                name="second_name"
                value={formData.second_name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone_number">Номер телефона</Label>
              <Input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
            </FormGroup>
            <SubmitButton type="submit">Сохранить</SubmitButton>
          </form>
        </EditProfileContainer>
      </MainContent>
      <Footer />
    </PageContainer>
    );
  };

export default EditProfilePage;