import AnimeCollectionCard from "../components/AnimeCollectionCard";
import { AnimeCollectionsContainer } from "../style/AnimeCollections";
import { SubTitle, TitleContainer } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle, ToastBase } from "../style/GeneralStyle";

import plusIcon from '../images/icon/plus-large.svg';

import { css } from '@emotion/css';
import ModalInputCollection from "../components/ModalInputCollection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDefault from "../components/ModalDefault";

import timesIcon from '../images/icon/icon-times.svg';

interface IAnimeCollectionData {
  name: string;
}

const AnimeCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [showInputCollectionModal, setShowInputCollectionModal] = useState(false);
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCollectionExist, setShowCollectionExist] = useState(false);
  const navigate = useNavigate();

  const animeCollection = localStorage.getItem('animeCollection') || '[]';
  const collectionParsed = JSON.parse(animeCollection);

  const handleShowInputCollectionModal = () => {
    setShowInputCollectionModal(!showInputCollectionModal);
    setCollectionName('');
  };

  const redirectToAnimeList = (name: string) => {
    navigate({ pathname: '/anime-collection/detail', search: `?name=${name}` });
  };

  const handleShowDeleteCollectionModal = (name: string) => {
    console.log(name);
    setShowDeleteCollectionModal(!showDeleteCollectionModal);
  };

  const handleDeleteCollection = (name: string) => {
    console.log(name);
    // collectionParsed.splice(collectionName.indexOf(name), 1)
    // localStorage.setItem("animeCollection", JSON.stringify(collectionParsed));
  }

  const handleAddCollection = () => {
    const collectionData: IAnimeCollectionData = {
      name: collectionName,
    };

    const isCollectionExist = collectionParsed.find((anime: IAnimeCollectionData) => anime.name.includes(collectionName));

    try {
      if (isCollectionExist) {
        setShowCollectionExist(!showCollectionExist);

        setTimeout(() => {
          setShowCollectionExist(false);
        }, 3000);

        return;
      }

      collectionParsed.push(collectionData);
      localStorage.setItem("animeCollection", JSON.stringify(collectionParsed));

      setShowToast(true);
      handleShowInputCollectionModal();

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (e) {
      // do nothing
    }
  };

  return (
    <>
      <ModalInputCollection
        onChangeCollectionName={(e) => setCollectionName(e)}
        onCloseInputCollection={handleShowInputCollectionModal}
        showInputCollectionModal={showInputCollectionModal}
        collectionName={collectionName}
        addCollection={handleAddCollection}
        showCollectionExist={showCollectionExist}
      />
      <ModalDefault
        showModal={showDeleteCollectionModal}
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
            <div className={css`justify-content: center; display: flex; gap: 10px; `}>
              <ButtonRounded
                backgroundColor="#dc4242"
                padding="10px 20px"
                className={css`
                  color: #fff;
                `}
              >
                No
              </ButtonRounded>
              <ButtonRounded
                backgroundColor="#0A50A3"
                padding="10px 20px"
                className={css`
                  color: #fff;
                `}
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
            onClick={handleShowInputCollectionModal}
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
            onDelete={handleShowDeleteCollectionModal}
            onClick={redirectToAnimeList}
            key={`anime-collection-${i}`}
            showActionButton={true}
            bannerImage={index.animeList && index.animeList[0].bannerImage}
            name={index.name}
            totalCollections={index.animeList}
          />
        )) : <p>No collection added yet</p>}
        {showToast ? (
          <ToastBase>
            Collection Added
          </ToastBase>
        ) : null}
      </AnimeCollectionsContainer>
    </>
  )
}

export default AnimeCollection;