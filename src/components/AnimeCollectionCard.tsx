import { AnimeCollectionCardContainer } from "../style/AnimeCollections";
import { AnimeCardImage, AnimeCardImageContainer, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle } from "../style/GeneralStyle";
import deleteIcon from '../images/icon/icon-delete.svg';
import emptyImage from '../images/icon/message-square-image.svg';
import editIcon from '../images/icon/icon-edit.svg';

import { css } from '@emotion/css';
import { IAnimeCollectionCard } from "../interface/anime.interface";

const AnimeCollection = (props: IAnimeCollectionCard) => {
  const { showEditButton = true, showActionButton = true } = props;

  const renderCollectionBanner = () => {
    return (
      <>
        {props.bannerImage ?
          <AnimeCardImage src={props.bannerImage} alt={props.bannerImage}/>
          : <ImageResize
              width="100px"
              height="150px"
              src={emptyImage}
              alt="empty-image"
              className={css`background-color: #ECF2F8;`}
            />}
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
              onClick={props?.onDelete as () => void}
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
                alt="deletIocn"
              />
              <span className={css`padding-left: 5px`}>Delete</span>
            </ButtonRounded>
            {showEditButton ? (
              <ButtonRounded
                onClick={props.onEdit as () => void}
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
                  alt="editIcon"
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