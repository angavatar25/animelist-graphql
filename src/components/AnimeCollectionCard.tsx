import { AnimeCardEmpty, AnimeCollectionCardContainer } from "../style/AnimeCollections";
import { AnimeCardImage, AnimeCardImageContainer, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle } from "../style/GeneralStyle";
import deleteIcon from '../images/icon/icon-delete.svg';
import editIcon from '../images/icon/icon-edit.svg';

import { css } from '@emotion/css';

interface IAnimeCard {
  showEditButton?: boolean;
  onClick?(): void;
  onDelete?(): void;
  onEdit?(): void;
};

const AnimeCollection = (props: IAnimeCard) => {
  const { showEditButton = true } = props;

  const isImageEmpty = false;
  const imageUrl = 'https://cdn1.katadata.co.id/media/images/thumb/2022/11/09/KARAKTER_ANIME_TERIMUT-2022_11_09-23_24_11_40afed16ccfe66e4587285ea8eaada1e_960x640_thumb.jpg';

  const renderCollectionBanner = () => {
    return (
      <>
        {!isImageEmpty ? <AnimeCardImage src={imageUrl}/> : <AnimeCardEmpty>C</AnimeCardEmpty>}
      </>
    )
  }
  return (
    <AnimeCollectionCardContainer onClick={props?.onClick}>
      <AnimeCardImageContainer>
        {renderCollectionBanner()}
      </AnimeCardImageContainer>
      <div className={css`
        padding-left: 15px;
        position: relative;
      `}>        
        <div className={css`
          margin: auto 0;
          line-height: 1.75          
        `}>
          <MainTitle
            fontSize="24px"
          >
            Collection Name
          </MainTitle>
          <SubTitle>
            10 Collections
          </SubTitle>
        </div>
        <div className={css`
          display: flex;
          gap: 10px;
          position: absolute;
          bottom: 10px;
        `}>
          <ButtonRounded
            onClick={props.onDelete}
            className={css`
              color: #fff;
              margin: auto 0;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
            backgroundColor="#dc4242"
            padding="10px 20px"
          >
            <ImageResize
              width="15px"
              height="15px"
              src={deleteIcon}
              alt=""
            />
            <span className={css`padding-left: 5px`}>Delete</span>
          </ButtonRounded>
          {showEditButton ? (
            <ButtonRounded
              onClick={props.onEdit}
              className={css`
                margin: auto 0;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
              backgroundColor="#0A50A3"
              padding="10px 20px"
            >
              <ImageResize
                width="15px"
                height="15px"
                src={editIcon}
                alt=""
              />
              <span className={css`padding-left: 5px`}>Edit</span>
            </ButtonRounded>
          ) : null}
        </div>
      </div>
    </AnimeCollectionCardContainer>
  )
}

export default AnimeCollection;