import { useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import { AnimeListContainer, MainTitle, SubTitle, TitleContainer } from "../style/AnimeList";
import useRequester from "../hooks/useRequester";
import { useNavigate } from "react-router-dom";

import { css } from '@emotion/css';
import { ButtonRounded } from "../style/GeneralStyle";

const AnimeList = () => {
  const { fetchAnimeList, animeDataList } = useRequester();
  useEffect(() => {
    fetchAnimeList();
  }, []);

  const data = animeDataList && animeDataList['Page'];
  const navigate = useNavigate();

  const navigateToAnimeDetail = (id: number) => {
    navigate({ pathname: '/anime-detail', search: `?id=${id}` });
  }

  const navigateToAnimeCollection = () => {
    navigate({ pathname: '/anime-collections' });
  }
  return (
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

      {data && data['media'] ? data['media'].map((index: any) => (
        <AnimeCard
          key={`anime-card-${index.id}`}
          onClick={() => navigateToAnimeDetail(index.id)}
          banner={index.bannerImage}
          title={index.title.english}
          genres={index.genres}
        />
      )) : null}
    </AnimeListContainer>
  )
};

export default AnimeList;