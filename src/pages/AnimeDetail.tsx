import { AnimeContentContainer, AnimeDescription, AnimeDetailContainer, ImageBanner, ImageBannerContainer } from "../style/AnimeDetail";
import { AnimeGenre, FlexWrap, SubTitle } from "../style/AnimeList";
import { ButtonRounded, ImageResize, MainTitle } from "../style/GeneralStyle";
import leftArrow from '../images/icon/left-arrow.svg';

import { css } from '@emotion/css';
import { useNavigate } from "react-router";

const animeData ={
  "id": 21,
  "title": {
    "romaji": "ONE PIECE",
    "english": "ONE PIECE",
    "native": "ONE PIECE"
  },
  "type": "ANIME",
  "genres": [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy"
  ],
  "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
  "description": "Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.<br><br>\nEnter Monkey D. Luffy, a 17-year-old boy that defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece, are his reasons of becoming a pirate. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.<br><br>\n<b>*This includes following special episodes:</b><br>\n- Chopperman to the Rescue! Protect the TV Station by the Shore! (Episode 336)<br>\n- The Strongest Tag-Team! Luffy and Toriko's Hard Struggle! (Episode 492)<br>\n- Team Formation! Save Chopper (Episode 542)<br>\n- History's Strongest Collaboration vs. Glutton of the Sea (Episode 590)<br>\n- 20th Anniversary! Special Romance Dawn (Episode 907)"
};

const AnimeDetail = () => {
  const navigate = useNavigate();

  const navigateToAnimeDetail = () => {
    navigate({ pathname: '/' });
  }
  return (
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
            src={animeData.bannerImage} alt=""
          />
        </ImageBannerContainer>
        <AnimeContentContainer>
          <MainTitle>{animeData.title.english}</MainTitle>
          <SubTitle>Total episodes: 10</SubTitle>
          <AnimeDescription>
            {animeData.description}
          </AnimeDescription>
          <FlexWrap>
            {animeData.genres.slice(0, 3).map((index) => (
              <AnimeGenre key={`genre-${index}`}>
                {index}
              </AnimeGenre>
            ))}
          </FlexWrap>
          <SubTitle>Collections</SubTitle>
          <FlexWrap>
            <AnimeGenre>Hehehehe</AnimeGenre>
            <AnimeGenre>Hehehehe</AnimeGenre>
            <AnimeGenre>Hehehehe</AnimeGenre>
          </FlexWrap>
          <div className={css`
            text-align: center;
          `}>
            <ButtonRounded
              backgroundColor="#fff"
              padding="20px 30px"
              className={css`
                width: 30vw;
                margin-top: 20px;
                font-size: 16px;
                border: 1px solid #0A50A3;
                color: #0A50A3;
              `}
            >
              Add to my collection
            </ButtonRounded>
          </div>
        </AnimeContentContainer>
      </div>
    </AnimeDetailContainer>
  )
};

export default AnimeDetail;