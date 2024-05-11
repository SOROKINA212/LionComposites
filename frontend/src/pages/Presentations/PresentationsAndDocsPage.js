import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';

const PageContainer = styled.div`
  background-color: #1A1A1A;
  padding: 20px;
`;

const PresentationsAndDocsContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  background-color: #353333;
  border-radius: 20px;
  padding: 20px;
`;

const PresentationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0;
`;

const PresentationInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PresentationImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 20px;
`;

const PresentationName = styled.h3`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #F0F0F0;
`;

const PresentationDescription = styled.p`
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #F0F0F0;
`;

const ViewButton = styled.a`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 14px;
  background-color: #F0F0F0;
  color: #1A1A1A;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  text-decoration: none;
  cursor: pointer;
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
      <Footer />
    </PageContainer>
  );
};

export default PresentationsAndDocsPage;