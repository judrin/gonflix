import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 30px;

  h4 {
    display: inline-block;
    font-size: 22px;
    border-bottom: 3px solid #3498db;
    padding: 5px;
  }
`;

const Production = styled.div`
  margin-top: 30px;
`;

const Title = styled.h5`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Company = styled.div`
  text-align: center;
  line-height: 1.5;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  height: 40px;

  @media (min-width: 768px) {
    height: 65px;
  }
`;

const Name = styled.span`
  opacity: 0.7;
`;

const Countries = styled.div`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
`;

function ProductionContainer({ companies, countries }) {
  return (
    <Container>
      {companies && companies.length ? (
        <Production>
          <Title>Companies</Title>
          <Wrapper>
            {companies.map((company) => (
              <Company key={company.id}>
                {company.logo_path ? (
                  <Icon
                    src={`https://image.tmdb.org/t/p/w200/${company.logo_path}`}
                    title={company.name}
                  />
                ) : (
                  <Name>{company.name}</Name>
                )}
              </Company>
            ))}
          </Wrapper>
        </Production>
      ) : null}
      {countries && countries.length ? (
        <Production>
          <Title>Countries</Title>
          <Countries>
            {countries.map((country) => country.name).join(', ')}
          </Countries>
        </Production>
      ) : null}
    </Container>
  );
}

export default ProductionContainer;
