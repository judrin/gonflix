import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8px 15px 9px;
  margin-bottom: -1px;
  border-bottom: 3px solid
    ${(props) => (props.active ? '#3498db' : 'transparent')};
  transition: border-bottom 0.1s ease-in-out;
  &:hover {
    border-bottom: 3px solid #3498db;
  }
`;

const Name = styled.h4`
  font-size: 22px;
`;

function Tab({ name, active }) {
  return (
    <Container active={active}>
      <Name>{name}</Name>
    </Container>
  );
}

Tab.prototype = {
  name: PropTypes.string.isRequired,
};

export default Tab;
