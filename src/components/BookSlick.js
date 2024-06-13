import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const books = [
  { id: 1, title: '당신을 기다리고 있어', image: 'https://image.aladin.co.kr/product/23972/99/cover/8963717569_1.jpg' },
  { id: 2, title: '칵테일, 러브, 좀비', image: 'https://image.aladin.co.kr/product/23736/85/cover/k692639764_1.jpg' },
  { id: 3, title: '밝은 밤', image: 'https://image.aladin.co.kr/product/27541/91/cover/8954681174_1.jpg' },
  { id: 4, title: '어떤 물질의 사랑', image: 'https://image.aladin.co.kr/product/24605/89/cover/k532631174_1.jpg' },
  { id: 5, title: 'Learning React', image: 'https://via.placeholder.com/100x150' },
];

const BookCarouselContainer = styled.div`
  padding: 0 5%;

  margin: 0 auto;
  max-width: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;

  .slick-slider {
    width: 400px;
    margin: 0 auto;

  }

  .slick-list {
    padding: 0 40px;
  }

  .slick-slide img {
    display: block;
    margin: auto;
  }
`;

const BookItem = styled.div`
  padding: 0px;
  text-align: center;

  img {
    width: 100px;
    height: 150px;
  }
`;

const BookSlick = () => {
  const settings = {
    centerMode: true,
    centerPadding: '10px',
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: '20px',
        },
      },
    ],
  };

  return (
    <BookCarouselContainer>
      <Slider {...settings}>
        {books.map((book) => (
          <BookItem key={book.id}>
            <img src={book.image} alt={book.title} />
          </BookItem>
        ))}
      </Slider>
    </BookCarouselContainer>
  );
};

export default BookSlick;
