import { ButtonRounded, ImageResize, InputBase, MainTitle } from "../style/GeneralStyle";
import ModalDefault from "./ModalDefault";
import { css } from '@emotion/css';
import timesIcon from '../images/icon/icon-times.svg';
import AnimeCollection from "./AnimeCollectionCard";
import plusIcon from '../images/icon/plus-large.svg';

interface IModalInputToCollection {
  showCollectionModal: boolean;
  showInputCollection: boolean;
  collectionData: Array<collection>;
  collectionName: string;
  onChangeCollectionName: (value: string) => void;
  onClose?(): void;
  addCollection?(): void;
  inputCollection?(): void;
  onCloseInputCollection?(): void;
  insertCollection?: (value: any) => void;
};

interface collection {
  bannerImage: string,
  id: number,
  episodes: number,
  name: string,
  animeList: Array<animeData>,
};

interface animeData {
  bannerImage: string,
  id: number,
  episodes: number,
  name: string,
};

const ModalInputToCollection = (props: IModalInputToCollection) => {
  const { showCollectionModal = false, collectionData } = props;
  const isCollectionAvailable = collectionData.length > 0;

  const inputAnime = (info: any) => {
    if (info) props.insertCollection?.(info);
  };

  const handleInputCollectionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeCollectionName) {
      props.onChangeCollectionName(e.target.value);
    }
  }

  const renderAddCollectionButton = () => {
    return (
      <>
        {!isCollectionAvailable ? (
          <ButtonRounded
            onClick={props.inputCollection}
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
              margin-top: 10px;
            `}
          >
            <ImageResize
              width="15px"
              height="15px"
              src={plusIcon}
              alt="addIcon"
            />
            <span className={css`
              padding-left: 5px
            `}>Add new collection</span>
          </ButtonRounded>
        ) : null}
      </>
    )
  }
  return (
    <ModalDefault
      showModal={showCollectionModal}
    >
      <div className={css`
        background-color: #ECECF2;
        max-width: 80%;
        max-height: 450px;
        overflow-y: scroll;
        width: 100%;
        border-radius: 10px;
        padding: 20px;
        &::-webkit-scrollbar {
          display: none;
        }
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
            `}>Choose Collection
            </MainTitle>
            <ImageResize
              onClick={props.onClose}
              width="40px"
              height="40px"
              src={timesIcon}
            />
          </div>
          {renderAddCollectionButton()}
        </div>
        <div>
          {collectionData.length > 0 ? collectionData.map((index, i) => (
            <AnimeCollection
              onClick={inputAnime}
              key={`anime-collection-${i}`}
              showActionButton={false}
              bannerImage={index.animeList && index.animeList[0] && index.animeList[0].bannerImage}
              name={index.name}
              totalCollections={index.animeList}
            />
          )) : <p className={css`text-align: center;`}>No collection yet, add new collection</p>}
        </div>
      </div>
      {props.showInputCollection ? (
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
              `}>New collection
              </MainTitle>
              <ImageResize
                onClick={props.onCloseInputCollection}
                width="40px"
                height="40px"
                src={timesIcon}
              />
            </div>
          </div>
          <div className={css`position: relative; text-align: center;`}>
            <InputBase
              value={props.collectionName}
              onChange={handleInputCollectionName}
              type="text"
              placeholder="Input collection name"
            />
            <ButtonRounded
              onClick={props.addCollection}
              backgroundColor="#FFF"
              padding="10px 20px"
              className={css`
                margin-top: 20px;
                color: #0A50A3;
                border: 1px solid #0A50A3;
              `}
            >
              Add collection
            </ButtonRounded>
          </div>
        </div>
      ) : null}
    </ModalDefault>
  )
};

export default ModalInputToCollection;
