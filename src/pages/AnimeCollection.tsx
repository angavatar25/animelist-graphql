import AnimeCollectionCard from "../components/AnimeCollectionCard";
import { AnimeCollectionsContainer } from "../style/AnimeCollections";
import { SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, InputBase, MainTitle, ToastBase } from "../style/GeneralStyle";

import plusIcon from '../images/icon/plus-large.svg';
import leftArrow from '../images/icon/left-arrow.svg';

import { css } from '@emotion/css';
import ModalInputCollection from "../components/ModalInputCollection";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDefault from "../components/ModalDefault";

import timesIcon from '../images/icon/icon-times.svg';
import emptyFolder from '../images/icon/remove-folder.svg';

interface IAnimeCollectionData {
  name: string;
}

const AnimeCollection = () => {
  const [collectionName, setCollectionName] = useState('');
  const [selectedCollectionName, setSelectedCollectionName] = useState('');
  const [showInputCollectionModal, setShowInputCollectionModal] = useState(false);
  const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false);
  const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
  const [isCollectionContainChar, setIsCollectionContainChar] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCollectionExist, setShowCollectionExist] = useState(false);
  const navigate = useNavigate();

  const animeCollection = localStorage.getItem('animeCollection') || '[]';
  const collectionParsed = JSON.parse(animeCollection);

  const handleShowInputCollectionModal = () => {
    setShowInputCollectionModal(!showInputCollectionModal);
    emptyCollectionNameInput();
  };

  const handleEditCollectionModal = () => {
    setShowEditCollectionModal(!showEditCollectionModal);
  }

  const closeEditModal = () => {
    setShowEditCollectionModal(false);
    emptyCollectionNameInput();
  }

  const emptyCollectionNameInput = () => {
    setCollectionName('');
  }

  const redirectToAnimeDetail = (name: string) => {
    navigate({ pathname: '/anime-collection/detail', search: `?name=${name}` });
  };

  const redirectToAnimeList = () => {
    navigate({ pathname: '/' });
  }

  const handleShowDeleteCollectionModal = (name: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (e && e.stopPropagation) e.stopPropagation();

    if (name) {
      setSelectedCollectionName(name)
      setShowDeleteCollectionModal(!showDeleteCollectionModal);
    }
  };

  const handleShowEditCollectionModal = (name: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (e && e.stopPropagation) e.stopPropagation();

    if (name) {
      setSelectedCollectionName(name);
      setCollectionName(name);
      handleEditCollectionModal();
    }
  }

  const editCollection = () => {
    // Check if new collection contain special character
    if (!/^[A-Za-z\s]*$/.test(collectionName)) {
      setIsCollectionContainChar(true);

      setTimeout(() => {
        setIsCollectionContainChar(false);
      }, 3000);

      return;
    }

    const animeCollectionIndex = collectionParsed.findIndex((index: any) => index?.name.includes(selectedCollectionName));

    collectionParsed[animeCollectionIndex].name = collectionName;
    localStorage.setItem('animeCollection', JSON.stringify(collectionParsed));

    handleEditCollectionModal();
  }

  const handleDeleteCollection = () => {
    const animeCollectionIndex = collectionParsed.findIndex((index: any) => index?.name.includes(collectionName));
    collectionParsed.splice(animeCollectionIndex, 1);
    localStorage.setItem("animeCollection", JSON.stringify(collectionParsed));

    setShowDeleteCollectionModal(false);
  }

  const handleInputNewCollectionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(e.target.value);
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
          alt="emptyFolder"
        />
        <p>No anime list added in this collection</p>
      </div>
    )
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
      {/* Modal for delete collection */}
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
              onClick={() => setShowDeleteCollectionModal(false)}
              width="40px"
              height="40px"
              src={timesIcon}
            />
          </div>
          <div>
            <p className={css`text-align: center`}>Are you sure to delete this from your collection ?</p>
            <div className={css`justify-content: center; display: flex; gap: 10px; `}>
              <ButtonRounded
                onClick={() => setShowDeleteCollectionModal(false)}
                backgroundColor="#dc4242"
                padding="10px 20px"
                className={css`
                  color: #fff;
                `}
              >
                No
              </ButtonRounded>
              <ButtonRounded
                onClick={handleDeleteCollection}
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
      {/* End of modal for delete collection */}

      {/* Modal for edit collection */}
      <ModalDefault
        showModal={showEditCollectionModal}
      >
        <div className={css`
          background-color: #ECECF2;
          max-width: 80%;
          width: 100%;
          border-radius: 10px;
          padding: 20px;
          position: absolute;
        `}>
          <div className={css`
            margin-bottom: 30px;
          `}>
            <div className={css`
              display: flex;
              justify-content: space-between;
            `}>
              <MainTitle className={css`
                text-align: center;
                margin: auto 0;
              `}>Edit collection
              </MainTitle>
              <ImageResize
                onClick={closeEditModal}
                width="40px"
                height="40px"
                src={timesIcon}
              />
            </div>
          </div>
          <div className={css`position: relative; text-align: center;`}>
            <InputBase
              value={collectionName}
              onChange={(e) => handleInputNewCollectionName(e)}
              type="text"
              placeholder="Input collection name"
            />
            {isCollectionContainChar ? (
              <p className={css`
                color: #dc4242;
                `}
              >
                Collection contain special char
              </p>
            ) : null}
            <ButtonRounded
              onClick={editCollection}
              backgroundColor="#FFF"
              padding="10px 20px"
              className={css`
                margin-top: 20px;
                color: #0A50A3;
                border: 1px solid #0A50A3;
              `}
            >
              Save new collection name
            </ButtonRounded>
          </div>
        </div>
      </ModalDefault>
      {/* End of modal for edit collection */}
      <AnimeCollectionsContainer>
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
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
              alt="emptyFolder"
            />
            <span className={css`
              padding-left: 5px
            `}>Add collection</span>
          </ButtonRounded>
        </div>
        <div className={css`margin-bottom: 20px;`}>
          <ButtonRounded
            onClick={redirectToAnimeList}
            backgroundColor="#FFF"
            padding="10px 20px"
          >
            <div className={css`display: flex;`}>
              <ImageResize
                width="20px"
                height="20px"
                src={leftArrow}
                alt="leftArrow"
              />
              <p className={css`margin: auto 0; margin-left: 10px;`}>Go to anime list</p>
            </div>
          </ButtonRounded>
        </div>
        {collectionParsed.length > 0 ? collectionParsed.map((index: any, i: number) => (
          <AnimeCollectionCard
            onDelete={(e: React.MouseEvent<HTMLButtonElement>) => handleShowDeleteCollectionModal(index.name, e)}
            onClick={redirectToAnimeDetail}
            onEdit={(e: React.MouseEvent<HTMLButtonElement>) => handleShowEditCollectionModal(index.name, e)}
            key={`anime-collection-${i}`}
            showActionButton={true}
            bannerImage={index.animeList && index.animeList[0] && index.animeList[0].bannerImage}
            name={index.name}
            totalCollections={index.animeList}
          />
        )) : showNoCollectionValidation()}
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