import AnimeCollectionCard from "../components/AnimeCollectionCard";
import { AnimeCollectionsContainer } from "../style/AnimeCollections";
import { SubTitle, TitleContainer } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle } from "../style/GeneralStyle";

import plusIcon from '../images/icon/plus-large.svg';

import { css } from '@emotion/css';

const AnimeCollection = () => {
  const animeCollection = localStorage.getItem('animeCollection') || '[]';
  const collectionParsed = JSON.parse(animeCollection);
  return (
    <AnimeCollectionsContainer>
      <div className={css`
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
      `}>
        <div className={css`
          line-height: 1.5;
        `}>
          <MainTitle>Collections</MainTitle>
          <SubTitle>Your best pick anime collections</SubTitle>
        </div>
        <ButtonRounded
          backgroundColor="#0A50A3"
          padding="10px 12px"
          className={css`
            width: fit-content;
            height: fit-content;
            font-size: 16px;
            border: 1px solid #0A50A3;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto 0;
          `}
        >
          <ImageResize
            width="15px"
            height="15px"
            src={plusIcon}
            alt=""
          />
          <span className={css`
            padding-left: 5px
          `}>Add collection</span>
        </ButtonRounded>
      </div>
      {collectionParsed.length > 0 ? collectionParsed.map((index: any, i: number) => (
        <AnimeCollectionCard
          key={`anime-collection-${i}`}
          showActionButton={true}
          bannerImage={index.bannerImage}
          name={index.name}
          totalEpisodes={index.totalEpisodes}
        />
      )) : <p>No collection added yet</p>}
    </AnimeCollectionsContainer>
  )
}

export default AnimeCollection;