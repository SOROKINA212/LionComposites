import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ReviewContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ReviewBox = styled.div`
    background-color: #353333;
    border-radius: 40px;
    box-shadow: 0px 15px 29.4px rgba(0, 0, 0, 0.5);
    padding: 1.5%;
    margin-bottom: 2%;
    align-self: ${props => props.isEven ? 'flex-end' : 'flex-start'};
    width: 50%;
    height: 40%;
    margin-left: ${props => props.isEven ? '0' : '15%'};
    margin-right: ${props => props.isEven ? '15%' : '0'};
`;

const ReviewUserName = styled.h4`
    color: white;
    margin-bottom: 10px;
    font-size: 3vw; /* Устанавливаем размер шрифта */
    font-family: 'Montserrat', sans-serif; /* Задаем шрифт Montserrat */
    font-weight: 600;
`;

const ReviewContent = styled.p`
    color: white;
     font-size: 2.5vw; /* Устанавливаем размер шрифта */
    font-family: 'Montserrat', sans-serif; /* Задаем шрифт Montserrat */
    font-weight: 400;
`;

const Review = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${productId}/reviews`);
                const reviewsData = response.data.map(async review => {
                    const userResponse = await axios.get(`http://localhost:8000/api/users/${review.user}`);
                    const userName = userResponse.data.username;
                    return { ...review, user: userName };
                });
                const resolvedReviews = await Promise.all(reviewsData);
                setReviews(resolvedReviews.reverse());
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData();
    }, [productId]);

    return (
        <ReviewContainer>
            {reviews.map((review, index) => (
                <ReviewBox key={review.id} isEven={index % 2 !== 0}>
                    <ReviewUserName>{review.user}</ReviewUserName>
                    <ReviewContent>{review.content}</ReviewContent>
                </ReviewBox>
            ))}
        </ReviewContainer>
    );
}

export default Review;
