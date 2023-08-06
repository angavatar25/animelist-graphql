import { AnimeCollectionsContainer } from "../style/AnimeCollections";
import AnimeCollectionCard from "../components/AnimeCollectionCard";
import { MainTitle, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize } from "../style/GeneralStyle";
import leftArrow from '../images/icon/left-arrow.svg';
import timesIcon from '../images/icon/icon-times.svg';

import { css } from '@emotion/css';
import ModalDefault from "../components/ModalDefault";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnimeCollection from "../components/AnimeCollectionCard";
import AnimeCard from "../components/AnimeCard";

const AnimeCollectionDetail = () => {
  const [searchParams] = useSearchParams();
  const collectionName = searchParams.get('name');
  const isCollectionAvailable = localStorage.getItem('animeCollection') || '[]';
  const collectionParsed = JSON.parse(isCollectionAvailable);
  const animeList = collectionParsed.find((index: any) => index.name === collectionName).animeList;
  const navigate = useNavigate();

  const navigateToAnimeDetail = (id: number) => {
    navigate({ pathname: '/anime-detail', search: `?id=${id}` });
  }

  const backToCollectionList = () => {
    navigate({ pathname: '/anime-collections' });
  }
  return (
    <>
      <ModalDefault
        showModal={false}
      >
        <div className={css`
          background-color: #ECECF2;
          max-width: 80%;
          width: 100%;
          border-radius: 10px;
          padding: 20px;
        `}>
          <div className={css`
            display: flex;
            justify-content: space-between;
          `}>
            <MainTitle
              className={css`
                text-align: center;
                margin: auto 0;
            `}>Delete
            </MainTitle>
            <ImageResize
              width="40px"
              height="40px"
              src={timesIcon}
            />
          </div>
          <div>
            <p className={css`text-align: center`}>Are you sure to delete this from your collection ?</p>
            <div className={css`justify-content: center; display: flex; gap: 10px;`}>
              <ButtonRounded
                backgroundColor="#dc4242"
                padding="10px 20px"
              >
                No
              </ButtonRounded>
              <ButtonRounded
                backgroundColor="#0A50A3"
                padding="10px 20px"
              >
                Yes
              </ButtonRounded>
            </div>
          </div>
        </div>
      </ModalDefault>
      <AnimeCollectionsContainer>
        <div className={css`
          display: flex;
          margin-bottom: 40px;
        `}>
          <ButtonRounded
            onClick={backToCollectionList}
            backgroundColor="#FFF"
            padding="10px 20px"
            className={css`
              margin: auto 0;
              margin-right: 20px;
            `}
          >
            <ImageResize
              width="15px"
              height="15px"
              src={leftArrow}
              alt=""
            />
          </ButtonRounded>
          <div className={css`
            line-height: 1.5;
          `}>
            <MainTitle>List</MainTitle>
            <SubTitle>Your best pick anime list</SubTitle>
          </div>
        </div>
        {animeList && animeList.length > 0 ?
          animeList.map((index: any, i: number) => (
            <AnimeCard
              onClick={() => navigateToAnimeDetail(index.id)}
              key={`anime-collection-${i}`}
              banner={index.bannerImage}
              title={index.name}
              genres={index.genres || []}
            />
          )) : null
        }
      </AnimeCollectionsContainer>
    </>
  )
};

export default AnimeCollectionDetail;