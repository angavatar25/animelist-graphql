import { AnimeCollectionsContainer } from "../style/AnimeCollections";
import { MainTitle, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, ToastBase } from "../style/GeneralStyle";
import leftArrow from '../images/icon/left-arrow.svg';
import timesIcon from '../images/icon/icon-times.svg';
import emptyFolder from '../images/icon/remove-folder.svg';

import { css } from '@emotion/css';
import ModalDefault from "../components/ModalDefault";
import { useNavigate, useSearchParams } from "react-router-dom";
import AnimeCollection from "../components/AnimeCollectionCard";
import { useState } from "react";
import { animeData, collection } from "../interface/anime.interface";

const AnimeCollectionDetail = () => {
  const [showDeleteAnimeModal, setShowDeleteAnimeModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [animeName, setAnimeName] = useState('');

  const [searchParams] = useSearchParams();
  const collectionName = searchParams.get('name');
  const isCollectionAvailable = localStorage.getItem('animeCollection') || '[]';
  const collectionParsed = JSON.parse(isCollectionAvailable);
  const animeList = collectionParsed.find((index: collection) => index.name === collectionName).animeList;
  const navigate = useNavigate();

  const navigateToAnimeDetail = (id: number) => {
    navigate({ pathname: '/anime-detail', search: `?id=${id}` });
  }

  const backToCollectionList = () => {
    navigate({ pathname: '/anime-collections' });
  }

  const handleDeleteAnimeModal = () => {
    setShowDeleteAnimeModal(!showDeleteAnimeModal);
  }

  const handleShowDeleteAnimeModal = (name: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (e && e.stopPropagation) e.stopPropagation();

    if (name) {
      setAnimeName(name);
      handleDeleteAnimeModal();
    }
  }

  const showNoCollectionValidation = () => {
    return (
      <div className={css`
        position: absolute;
        left: 0;
        transform: translateX(50%);
        transform: translateY(50%);
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}>
        <ImageResize
          width="100px"
          height="100px"
          src={emptyFolder}
          alt="emptyFoler"
        />
        <p>No anime list added in this collection</p>
      </div>
    )
  }

  const handleDeleteAnime = () => {
    const animeCollectionIndex = animeList.findIndex((index: collection) => index?.name.includes(animeName));
    animeList.splice(animeCollectionIndex, 1);
    localStorage.setItem("animeCollection", JSON.stringify(collectionParsed));

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000)

    handleDeleteAnimeModal();
  };
  return (
    <>
      <ModalDefault
        showModal={showDeleteAnimeModal}
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
                onClick={handleDeleteAnimeModal}
                className={css`color: #fff`}
                backgroundColor="#dc4242"
                padding="10px 20px"
              >
                No
              </ButtonRounded>
              <ButtonRounded
                onClick={handleDeleteAnime}
                className={css`color: #fff`}
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
              alt="leftArrow"
            />
          </ButtonRounded>
          <div className={css`
            line-height: 1.5;
          `}>
            <MainTitle>{collectionName}</MainTitle>
            <SubTitle>Your best pick anime list</SubTitle>
          </div>
        </div>
        {animeList && animeList.length > 0 ?
          animeList.map((index: animeData, i: number) => (
            <AnimeCollection
              onClick={() => navigateToAnimeDetail(index.id)}
              onDelete={(e: React.MouseEvent<HTMLButtonElement>) => handleShowDeleteAnimeModal(index.name, e)}
              key={`anime-collection-${i}`}
              bannerImage={index.bannerImage}
              name={index.name}
              showActionButton={true}
              showEditButton={false}
            />
          )) : showNoCollectionValidation()
        }
        {showToast ? (
          <ToastBase>
            Anime Deleted
          </ToastBase>
        ) : null}
      </AnimeCollectionsContainer>
    </>
  )
};

export default AnimeCollectionDetail;