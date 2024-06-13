import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const books = [
  { id: 1, title: 'Learning React', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Learning React', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Learning React', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Learning React', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Learning React', image: 'https://via.placeholder.com/150' },
];

const BookCarouselContainer = styled.div`
  .slick-slider {
    margin: 0 auto;
    max-width: 800px;
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
  padding: 20px;
  text-align: center;

  img {
    width: 150px;
    height: 150px;
  }
`;

const BookSlick = () => {
  const settings = {
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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
