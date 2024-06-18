import backicon from '../assets/backicon.png';
import styled from 'styled-components';

const BackBtn = ({ onClick }) => {
  return (
    <BackContainer onClick={onClick}>
      <BackIcon src={backicon} alt="Back Icon" />
    </BackContainer>
  );
};

const BackIcon = styled.img`
  width: 20px;
  height: 20px;
  display: flex;
`;

const BackContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  cursor: pointer;
`;

export default BackBtn;