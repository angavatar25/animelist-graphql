import { useState } from "react";
import AnimeCard from "../components/AnimeCard";
import { AnimeListContainer, MainTitle, SubTitle, TitleContainer } from "../style/AnimeList";
import { useNavigate } from "react-router-dom";

import { css } from '@emotion/css';
import { ButtonRounded } from "../style/GeneralStyle";
import { useQuery } from "@apollo/client";
import { animeListQuery } from "../ApolloClient/query";

const AnimeList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = 10;
  const maxPage = 4;
  const range = [];

  const navigate = useNavigate();

  const navigateToAnimeDetail = (id: number) => {
    navigate({ pathname: '/anime-detail', search: `?id=${id}` });
  }

  const navigateToAnimeCollection = () => {
    navigate({ pathname: '/anime-collections' });
  }

  const maxVisibleButton = () => {
    if (totalPage < 4) {
      return totalPage
    } else {
      return maxPage
    }
  }

  const startPage = () => {
    if (currentPage === 1) {
      return 1
    }

    if (currentPage === totalPage) {
      return totalPage - maxVisibleButton() + 1
    }
    return currentPage - 1
  }

  const endPage = () => {
    return Math.min(startPage() + maxVisibleButton() - 1, totalPage)
  }

  for(var i = startPage(); i <= endPage(); i++) {
    range.push({
      name: i,
      isDisabled: i === currentPage,
    })
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  }

  const variablesTest = {
    page: currentPage,
    perPage: 10,
  };

  const { loading, error, data: animeData } = useQuery(animeListQuery,{ variables: variablesTest });

  const animeList = animeData && animeData['Page'];

  return (
    <>
      <AnimeListContainer>
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        `}>
          <TitleContainer>
            <MainTitle>Discover</MainTitle>
            <SubTitle>Find your best pick anime</SubTitle>
          </TitleContainer>
          <ButtonRounded
            onClick={navigateToAnimeCollection}
            className={css`
              width: fit-content;
              height: fit-content;
              margin: auto 0;
              color: #fff;
            `}
            backgroundColor="#0A50A3"
            padding="10px"
          >
            See collections
          </ButtonRounded>
        </div>
        {loading ? <p>Loading anime list</p> : (
          <>
            {animeList && animeList['media'] ? animeList['media'].map((index: any) => (
              <AnimeCard
                key={`anime-card-${index.id}`}
                onClick={() => navigateToAnimeDetail(index.id)}
                banner={index.bannerImage}
                title={index.title.english}
                genres={index.genres}
              />
            )) : null}
            <div className={css`
              display: flex;
              gap: 10px;
              justify-content: center;
              align-items: center;
            `}>
              {range.map((index, i) => (
                currentPage === index.name ? 
                (<button
                  onClick={() => handlePagination(index.name)}
                  key={`index-${i}`}
                  className={css`
                    border-radius: 999px;
                    border: none;
                    width: 30px;
                    height: 30px;
                    background-color: #0A50A3;
                    color: #fff;
                  `}
                >
                  {index.name} 
                </button>) : (<button
                  onClick={() => handlePagination(index.name)}
                  key={`index-${i}`}
                  className={css`
                    border-radius: 999px;
                    border: none;
                    width: 30px;
                    height: 30px;
                    background-color: #EDF2F7;
                  `}
                >
                  {index.name} 
                </button>)
              ))}
            </div>
          </>
        )}
      </AnimeListContainer>
    </>
  )
};

export default AnimeList;