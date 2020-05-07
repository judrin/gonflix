import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart } from  'react-icons/fa';

const StyledHeader = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.8);
  z-index: 10;
`

const List = styled.ul`
  display: flex;
  width: 100%;
`

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid ${props => props.current ? '#3498db' : 'transparent'};
  transition: border-bottom .3s ease-in-out;
`

const FavoriteItem = styled(Item)`
  margin-left: auto;
  border-bottom: none;
  font-size: 18px;
`

const StyledLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Header({ location: { pathname } }) {
  return (
    <StyledHeader>
      <List>
        <Item current={pathname === '/'}>
          <StyledLink to="/">Movies</StyledLink>
        </Item>
        <Item current={pathname === '/tv'}>
          <StyledLink to="/tv">TV</StyledLink>
        </Item>
        <Item current={pathname === '/search'}>
          <StyledLink to="/search">Search</StyledLink>
        </Item>
        <FavoriteItem>
          <StyledLink to="/favorites"><FaHeart /></StyledLink>
        </FavoriteItem>
      </List>
    </StyledHeader>
  )
}

export default withRouter(Header);