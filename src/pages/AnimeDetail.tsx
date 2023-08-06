import { 
  AnimeContentContainer,
  AnimeDescription,
  AnimeDetailContainer,
  ImageBanner,
  ImageBannerContainer
} from "../style/AnimeDetail";
import { AnimeGenre, FlexWrap, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle, ToastBase } from "../style/GeneralStyle";
import leftArrow from '../images/icon/left-arrow.svg';

import { css } from '@emotion/css';
import { useNavigate } from "react-router";
import ModalInputToCollection from "../components/ModalInputToCollection";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IAnimeDetail, collection } from "../interface/anime.interface";
import { useQuery } from "@apollo/client";
import { animeDetailQuery } from "../ApolloClient/query";

interface IAnimeCollectionData {
  name: string;
  animeList: Array<animeData>
}

interface animeData {
  bannerImage: string,
  id: number,
  episodes: number,
  name: string,
};

const AnimeDetail = () => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showInputCollection, setShowInputCollection] = useState(false);
  const [showInputCollectionToast, setShowInputCollectionToast] = useState(false);
  const [showAddAnimeToast, setShowAddAnimeToast] = useState(false);
  const [showAnimeExistToast, setShowAnimeExistToast] = useState(false);
  const [isCollectionContainChar, setIsCollectionContainChar] = useState(false)
  const [collectionName, setCollectionName] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const animeId = searchParams.get('id');
  const isCollectionAvailable = localStorage.getItem('animeCollection') || '[]';
  const collectionParsed = JSON.parse(isCollectionAvailable);
  let matchedAnimeData = [];


  const handleOpenCollectionModal = () => {
    setShowCollectionModal(!showCollectionModal);
  };

  const handleShowInputCollection = () => {
    setShowInputCollection(!showInputCollection);
  };

  const handleAddCollection = () => {
    if (collectionName.length > 0) {
      // Check if new collection contain special character
      if (!/^[A-Za-z\s]*$/.test(collectionName)) {
        setIsCollectionContainChar(true);

        setTimeout(() => {
          setIsCollectionContainChar(false);
        }, 3000);

        return;
      }
      const collectionData = {
        name: collectionName,
      };

      const initialData = [];

      const animeCollectionData = {
        id: animeDetailData?.id,
        name: animeTitle,
        bannerImage: animeDetailData?.bannerImage,
        genres: animeDetailData?.genres,
      };

      initialData.push(animeCollectionData);

      Object.assign(collectionData, { animeList: initialData });

      if (!isCollectionAvailable || collectionParsed.length === 0) {
        const data = [];
        data.push(collectionData);
        localStorage.setItem('animeCollection', JSON.stringify(data));
      }

      setShowInputCollectionToast(true);

      setTimeout(() => {
        setShowInputCollectionToast(false);
      }, 3000);

      handleOpenCollectionModal();
      handleShowInputCollection();
    }
  };

  const handleAddAnimeListToCollection = (anime: string) => {
    const filterByAnimeCollection = collectionParsed.find((index: collection) => index?.name.includes(anime));

    const animeCollectionData = {
      id: animeDetailData?.id,
      name: animeTitle,
      bannerImage: animeDetailData?.bannerImage,
      genres: animeDetailData?.genres,
    };

    const animeCollectionIndex = collectionParsed.findIndex((index: collection) => index?.name.includes(anime));

    if (filterByAnimeCollection) {
      const { animeList } = filterByAnimeCollection;

      if (animeList) {
        const data = collectionParsed[animeCollectionIndex].animeList;
        const isAnimeExist = data.some((index: animeData) => index.name.toLowerCase().includes(animeTitle?.toLowerCase()));

        if (isAnimeExist) {
          setShowAnimeExistToast(true);

          setTimeout(() => {
            setShowAnimeExistToast(false);
          }, 3000)

          return;
        }

        data.push(animeCollectionData);

        collectionParsed[animeCollectionIndex].animeList = data;
        localStorage.setItem('animeCollection', JSON.stringify(collectionParsed));
      }

      if (!animeList) {
        const data = [];
        data.push(animeCollectionData);
        Object.assign(collectionParsed[animeCollectionIndex], { animeList: data });

        localStorage.setItem('animeCollection', JSON.stringify(collectionParsed));
      }
    }

    setShowAddAnimeToast(true);
    handleOpenCollectionModal();

    setTimeout(() => {
      setShowAddAnimeToast(false);
    }, 3000)
  };

  const navigateToAnimeDetail = () => {
    navigate({ pathname: '/' });
  };

  const variables = {
    id: animeId,
  };

  const { loading, data: animeDetail } = useQuery(animeDetailQuery,{ variables });

  const animeDetailData = animeDetail && animeDetail['Media'] as IAnimeDetail;
  const animeTitle = animeDetailData?.title && animeDetailData?.title?.english;

  if (collectionParsed.length > 0) {
    matchedAnimeData = collectionParsed.filter((anime: IAnimeCollectionData) => anime.animeList && anime.animeList.some((list) => animeTitle && list.name.includes(animeTitle)));
  }

  return (
    <>
      <ModalInputToCollection
        insertCollection={handleAddAnimeListToCollection}
        showCollectionModal={showCollectionModal}
        collectionData={collectionParsed}
        onClose={handleOpenCollectionModal}
        onCloseInputCollection={handleShowInputCollection}
        inputCollection={handleShowInputCollection}
        showInputCollection={showInputCollection}
        addCollection={handleAddCollection}
        onChangeCollectionName={(e) => setCollectionName(e)}
        collectionName={collectionName}
        isCollectionContainChar={isCollectionContainChar}
      />
      <AnimeDetailContainer>
        <div>
          {loading ? <p>Loading anime detail</p> : (
            <>
              <ButtonRounded
                onClick={navigateToAnimeDetail}
                backgroundColor="#FFF"
                padding="10px 20px"
                isPositionAbsolute={true}
              >
                <ImageResize
                  width="15px"
                  height="15px"
                  src={leftArrow}
                  alt="leftArrow"
                />
              </ButtonRounded>
              <ImageBannerContainer>
                <ImageBanner
                  src={animeDetailData?.bannerImage} alt=""
                />
              </ImageBannerContainer>
              <AnimeContentContainer>
                <MainTitle>{animeTitle}</MainTitle>
                {animeDetailData?.episodes ? (
                  <SubTitle>Total episodes: {animeDetailData?.episodes}</SubTitle>
                ) : <SubTitle>No episodes available</SubTitle>}
                <AnimeDescription dangerouslySetInnerHTML={{__html: animeDetailData?.description as TrustedHTML}}/>
                <FlexWrap>
                  {animeDetailData?.genres.slice(0, 3).map((index: Array<[]>) => (
                    <AnimeGenre key={`genre-${index}`}>
                      {index}
                    </AnimeGenre>
                  ))}
                </FlexWrap>
                <SubTitle>Collections</SubTitle>
                <FlexWrap>
                  {matchedAnimeData.length > 0 ? matchedAnimeData.map((index: IAnimeCollectionData, i: number) => (
                    <AnimeGenre key={`anime-collection-${i}`}>
                      {index.name}
                    </AnimeGenre>
                  )) : <p>No collections from this anime</p>}
                </FlexWrap>
                <div className={css`
                  text-align: center;
                `}>
                  <ButtonRounded
                    onClick={handleOpenCollectionModal}
                    backgroundColor="#fff"
                    padding="20px 30px"
                    className={css`
                      width: 30vw;
                      margin-top: 20px;
                      font-size: 16px;
                      border: 1px solid #0A50A3 !important;
                      color: #0A50A3 !important;
                    `}
                  >
                    Add to my collection
                  </ButtonRounded>
                </div>
              </AnimeContentContainer>
            </>
          )}
        </div>
        {showInputCollectionToast ? (
          <ToastBase>
            Collection Added
          </ToastBase>
        ) : null}
        {showAddAnimeToast ? (
          <ToastBase>
            Anime Added
          </ToastBase>
        ) : null}
        {showAnimeExistToast ? (
          <ToastBase>
            Anime already added to the collection
          </ToastBase>
        ) : null}
      </AnimeDetailContainer>
    </>
  )
};

export default AnimeDetail;