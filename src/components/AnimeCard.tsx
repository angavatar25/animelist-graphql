import {
  AnimeCardContainer,
  AnimeCardImage,
  AnimeCardImageContainer,
  AnimeGenre,
  AnimeTitle,
  AnimeTitleContainer,
  FlexWrap
} from "../style/AnimeList";

interface IAnimeCard {
  banner: string,
  title: string,
  genres: string[],
  onClick?(): void;
}

const AnimeCard = (props: IAnimeCard) => {  
  const {
    title: animeTitle,
    banner: animeBanner,
    genres: animeGenres,
  } = props;

  return (
    <div>
      <AnimeCardContainer onClick={props.onClick}>
        <AnimeCardImageContainer>
          <AnimeCardImage
            src={animeBanner}
            alt="anime-banner"
          />
        </AnimeCardImageContainer>
        <AnimeTitleContainer>
          <AnimeTitle>{animeTitle}</AnimeTitle>
          <FlexWrap>
            {animeGenres.slice(0, 3).map((index, i) => (
              <AnimeGenre
                key={`genre-${i}`}
              >
                {index}
              </AnimeGenre>
            ))}
          </FlexWrap>
        </AnimeTitleContainer>
      </AnimeCardContainer>
    </div>
  )
};

export default AnimeCard;