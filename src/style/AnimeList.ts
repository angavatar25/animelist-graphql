import styled from '@emotion/styled';

export const AnimeListContainer = styled.div`
  padding: 20px;
`

export const AnimeCardContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
`

export const TitleContainer = styled.div`
  line-height: 35px;
`

export const MainTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin: 0;
`

export const SubTitle = styled.p`
  font-size: 16px;
  color: #737373;
  margin: 0;
`

export const AnimeCardImageContainer = styled.div`
  width: 100px;
  height: 150px;
  max-height: 300px;
  border-radius: 6px;
  overflow: hidden;
`

export const AnimeCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const AnimeTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
`

export const AnimeGenre = styled.p`
  color: #0A50A3;
  background-color: #EDF2F7;
  width: fit-content;
  padding: 10px;
  font-size: 14px;
  border-radius: 999px;
`

export const AnimeTitleContainer = styled.div`
  padding-left: 20px;
  margin: auto 0;
`

export const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`