import { AnimeCardEmpty, AnimeCollectionCardContainer } from "../style/AnimeCollections";
import { AnimeCardImage, AnimeCardImageContainer, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle } from "../style/GeneralStyle";
import deleteIcon from '../images/icon/icon-delete.svg';
import editIcon from '../images/icon/icon-edit.svg';

import { css } from '@emotion/css';

interface IAnimeCard {
  showEditButton?: boolean;
  showActionButton?: boolean;
  bannerImage: string;
  name: string;
  totalCollections?: Array<collection>;
  onClick?: (string: string) => void;
  onDelete?: (string: string) => void;
  onEdit?(): void;
};

interface collection {
  name: string,
  animeList?: Array<animeData>,
};

interface animeData {
  bannerImage: string,
  id: number,
  episodes: number,
  name: string,
};

const AnimeCollection = (props: IAnimeCard) => {
  const { showEditButton = true, showActionButton = true } = props;

  const renderCollectionBanner = () => {
    return (
      <>
        {props.bannerImage ? <AnimeCardImage src={props.bannerImage}/> : <AnimeCardEmpty>C</AnimeCardEmpty>}
      </>
    )
  }
  return (
    <AnimeCollectionCardContainer onClick={() => props?.onClick?.(props.name)}>
      <AnimeCardImageContainer>
        {renderCollectionBanner()}
      </AnimeCardImageContainer>
      <div className={css`
        padding-left: 15px;
        position: relative;
        ${!showActionButton && `
          margin: auto 0;
        `}
      `}>        
        <div className={css`
          margin: auto 0;
          line-height: 1.75          
        `}>
          <MainTitle
            fontSize="24px"
          >
            {props.name}
          </MainTitle>
          {props.totalCollections && props.totalCollections.length > 0 ? (
            <SubTitle>
              {props.totalCollections?.length} Collections
            </SubTitle>
          ) :
          <SubTitle>
            No Collections
          </SubTitle>
        }
        </div>
        {showActionButton ? (
          <div className={css`
            display: flex;
            gap: 10px;
            position: absolute;
            bottom: 10px;
          `}>
            <ButtonRounded
              onClick={() => props?.onDelete?.(props.name)}
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
                  color: #fff;
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
        ) : null}
      </div>
    </AnimeCollectionCardContainer>
  )
}

export default AnimeCollection;