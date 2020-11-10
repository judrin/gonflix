import React, { useEffect } from 'react';
import TVPresenter from './TVPresenter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTVShows, updateFavorites } from 'redux/modules/tv';

function TVContainer() {

  const topRated = useSelector(state => state.topRated);
  const popular = useSelector(state => state.popular);
  const airingToday = useSelector(state => state.airingToday);
  const favorites = useSelector(state => state.favorites);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTVShows());
  }, [])
  

  const handleFavoriteClick = (event, id) => {
    event.preventDefault();
    const newFavorites = {...favorites};
    let updated = false;

    if (id in newFavorites) {
      delete newFavorites[id];
      updated = true;
    } else {
      const shows = [
        ...topRated,
        ...popular,
        ...airingToday
      ];

      const found = shows.find(show => show.id === id);

      if (found) {
        newFavorites[id] = found;
        updated = true;
      }
    }

    if (updated) {
      dispatch(updateFavorites(newFavorites));
      localStorage.setItem('tvFavorites', JSON.stringify(newFavorites));
    }
  }

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      favorites={favorites}
      handleFavoriteClick={handleFavoriteClick}
      loading={loading}
      error={error}
    />
  )
}

export default TVContainer;