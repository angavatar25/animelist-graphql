import { AnimeContentContainer, AnimeDescription, AnimeDetailContainer, ImageBanner, ImageBannerContainer } from "../style/AnimeDetail";
import { AnimeGenre, FlexWrap, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle, ToastBase } from "../style/GeneralStyle";
import leftArrow from '../images/icon/left-arrow.svg';

import { css } from '@emotion/css';
import { useNavigate } from "react-router";
import ModalInputToCollection from "../components/ModalInputToCollection";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useRequester from "../hooks/useRequester";

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
  const { fetchAnimeDetail, animeDetail } = useRequester();
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showInputCollection, setShowInputCollection] = useState(false);
  const [showInputCollectionToast, setShowInputCollectionToast] = useState(false);
  const [showAddAnimeToast, setShowAddAnimeToast] = useState(false);
  const [showAnimeExistToast, setShowAnimeExistToast] = useState(false);
  const [collectionName, setCollectionName] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const animeId = searchParams.get('id');
  const isCollectionAvailable = localStorage.getItem('animeCollection') || '[]';
  const collectionParsed = JSON.parse(isCollectionAvailable);
  let matchedAnimeData = [];

  useEffect(() => {
    if (animeId) {
      fetchAnimeDetail(Number(animeId));
    }
  }, []);

  const animeDetailData = animeDetail && animeDetail['Media'];
  const animeTitle = animeDetailData?.title && animeDetailData?.title?.english;

  if (collectionParsed.length > 0) {
    matchedAnimeData = collectionParsed.filter((anime: IAnimeCollectionData) => anime.animeList && anime.animeList.some((list) => animeTitle && list.name.includes(animeTitle)));
  }

  const handleOpenCollectionModal = () => {
    setShowCollectionModal(!showCollectionModal);
  };

  const handleShowInputCollection = () => {
    setShowInputCollection(!showInputCollection);
  };

  const handleAddCollection = () => {
    if (collectionName.length > 0) {
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
    const filterByAnimeCollection = collectionParsed.find((index: any) => index?.name.includes(anime));

    const animeCollectionData = {
      id: animeDetailData?.id,
      name: animeTitle,
      bannerImage: animeDetailData?.bannerImage,
      genres: animeDetailData?.genres,
    };

    const animeCollectionIndex = collectionParsed.findIndex((index: any) => index?.name.includes(anime));

    if (filterByAnimeCollection) {
      const { animeList } = filterByAnimeCollection;

      if (animeList) {
        const data = collectionParsed[animeCollectionIndex].animeList;
        const isAnimeExist = data.some((index: any) => index.name.toLowerCase().includes(animeTitle?.toLowerCase()));

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
        Object.assign(filterByAnimeCollection, { animeList: data });
        const updatedAnimeList = collectionParsed[animeCollectionIndex].push(filterByAnimeCollection);

        localStorage.setItem('animeCollection', JSON.stringify(updatedAnimeList));
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
      />
      <AnimeDetailContainer>
        <div>
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
              alt=""
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
              {animeDetailData?.genres.slice(0, 3).map((index) => (
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