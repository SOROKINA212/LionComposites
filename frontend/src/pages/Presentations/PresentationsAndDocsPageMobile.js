import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import { useMediaQuery } from 'react-responsive';

const FixedHeader = styled(Header)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
`;

const MainContent = styled.div`
  flex-grow: 1;
  flex-direction: column;
`;

const PageTitle = styled.h1`
    font-family: Montserrat, sans-serif;
    font-weight: 400;
    font-size: 3vw;
    margin-bottom: 5%;
    text-align: center;
    color: #FFFFFF;
    margin-top: 3%;
`;

const PageContainer = styled.div`
  background-color: #1A1A1A;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PresentationsAndDocsContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  background-color: #353333;
  border-radius: 20px;
  padding: 1%;
`;

const PresentationItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1% 0;
border-bottom: 1px solid #F0F0F0;
`;

const PresentationInfo = styled.div`
 height: 100px;
  display: flex;
  align-items: center;
`;

const PresentationImage = styled.img`
  width: 50%;
  height: 75%;
  border-radius: 7px;
  margin-right: 4%;
  margin-bottom: auto;
  margin-top: 5%;
`;

const PresentationName = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 2.2vw;
  color: #F0F0F0;
  margin-bottom: 10%;
  display: flex;
`;

const PresentationDescription = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 2vw;
  color: #F0F0F0;
  margin-bottom: auto;
  display: flex;
`;

const ViewButton = styled.button`
  height: 50%;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 2vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 0.5% 1%;
  cursor: pointer;
  margin-top: 15%;
  margin-right: 5%;

   &:hover {
    background-color: #D0D0D0; // Изменяем цвет фона при наведении
    color: #1A1A1A; // Изменяем цвет текста при наведении
  }
`;

const FixedFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #1A1A1A;
  z-index: 999;
`;

const PresentationsAndDocsPage = () => {
  const [presentationsAndDocs, setPresentationsAndDocs] = useState([]);

  useEffect(() => {
    const fetchPresentationsAndDocs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/presentations-and-docs/`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setPresentationsAndDocs(response.data);
      } catch (error) {
        console.error('Error fetching presentations and docs:', error);
      }
    };

    fetchPresentationsAndDocs();
  }, []);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <PageContainer>
      <Header />
      <SubHeader />
      <MainContent>
      <PageTitle>Презентации и документы</PageTitle>
      <PresentationsAndDocsContainer>
        {presentationsAndDocs.length > 0 ? (
          presentationsAndDocs.map(item => (
            <PresentationItem key={item.id}>
              <PresentationInfo>
                <PresentationImage src={item.image} alt={item.name} />
                <div>
                  <PresentationName>{item.name}</PresentationName>
                  <PresentationDescription>{item.description}</PresentationDescription>
                </div>
              </PresentationInfo>
              <ViewButton href={item.file} target="_blank" onClick={() => handleDownload(item.file)}>
                Посмотреть
              </ViewButton>
            </PresentationItem>
          ))
        ) : (
          <p>Нет доступных презентаций или документов.</p>
        )}
      </PresentationsAndDocsContainer>
      </MainContent>
      <FixedFooter />
    </PageContainer>
  );
};

export default PresentationsAndDocsPage;