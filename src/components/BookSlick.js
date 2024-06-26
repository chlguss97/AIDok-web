import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
const BookCarouselContainer = styled.div`
  padding: 0 5%;
  margin: 10% auto;
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
const BookSlick = ({ setFilteredAiData }) => {
  const user = useSelector((state) => state.userA.userAccount)
  const [books, setBooks] = useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const userDocRef = doc(db, 'bert', user.userId)
        const booksCollectionRef = collection(userDocRef, 'books')
        const querySnapshot = await getDocs(booksCollectionRef)
        const booksData = []
        querySnapshot.forEach(doc => {
          booksData.push({
            id: doc.id,
            ...doc.data()
          })
        })
        console.log("booksData", booksData)
        setBooks(booksData)
      } catch (error) {
        console.error("Error fetching books: ", error)
      }
    }
    fetchBooks()
  }, [])
  const handleClick = (book) => {
    // 예를 들어, 클릭된 book을 기준으로 데이터를 필터링하고 필터링된 데이터를 부모 컴포넌트에 전달할 수 있습니다.
    const filteredData = books.filter(item => item.id === book.id); // 예시로 id를 기준으로 필터링
    // 필터링된 데이터를 부모 컴포넌트로 전달
    setFilteredAiData(filteredData);
  };
  const getSlidesToShow = () => {
    if (books.length === 1) return 1;
    if (books.length === 2) return 2;
    return 3;
  };
  const settings = {
    centerMode: true,
    centerPadding: '10px',
    slidesToShow: getSlidesToShow(),
    focusOnSelect: true,
    infinite: books.length > 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: getSlidesToShow(),
          centerPadding: '20px',
        },
      },
    ],
  };
  return (
    <BookCarouselContainer>
      <Slider {...settings}>
        {books.map((book) => (
          <BookItem key={book.id} onClick={() => handleClick(book)}>
            <img src={book.bookImgUrl} alt={book.title} />
          </BookItem>
        ))}
      </Slider>
    </BookCarouselContainer>
  );
};
export default BookSlick;