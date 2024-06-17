import React from 'react';
import styled from 'styled-components';

const Toolbar = ({title}) => {
  return (
    <ToolbarContainer>
      <Title>{title}</Title>
    </ToolbarContainer>
  );
}

export default Toolbar;

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #5E7E71;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Title = styled.h1`
  font-size: 18px;
  color: white;
  text-align: center;
`;