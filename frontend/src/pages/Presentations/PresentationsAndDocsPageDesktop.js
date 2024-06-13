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
  background-color: #00000;
  border-radius: 20px;
  margin-bottom: 3%;
`;

const PresentationItem = styled.div`
  display: flex;
  background-color: #353333;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 9px 28.3px rgba(0, 0, 0, 0.8);
`;

const PresentationInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin-left: 20px;
`;

const PresentationImage = styled.img`
  width: 20%;
  height: 20%;
  border-radius: 10px;
  margin-right: 1%;

`;

const PresentationName = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1.3vw;
  color: #F0F0F0;
  margin-bottom: 10px;
`;

const PresentationDescription = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 1vw;
  color: #F0F0F0;
  margin-bottom: 0;
`;

const ViewButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 1vw;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: #D0D0D0;
    color: #1A1A1A;
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
            <PresentationImage src={item.image} alt={item.name} />
              <PresentationInfo>
                <div>
                  <PresentationName>{item.name}</PresentationName>
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