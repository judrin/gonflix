import React from 'react';
import styled from 'styled-components';
import Season from 'components/Season';

const Container = styled.div`
  margin-top: 50px;
`;

function SeasonsContainer({ seasons }) {
  return (
    <Container>
      {seasons.map((season) => (
        <Season
          key={season.id}
          imgUrl={season.poster_path}
          name={season.name}
          year={season.air_date && season.air_date.substring(0, 4)}
          epCount={season.episode_count}
          overview={season.overview}
        />
      ))}
    </Container>
  );
}

export default SeasonsContainer;
