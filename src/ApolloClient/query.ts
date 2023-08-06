import { gql } from "@apollo/client";

export const animeListQuery = gql`
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
        id
        title {
          romaji
          english
          native
        }
        type
        genres
        bannerImage
        description
        episodes
      }
    }
  }
`

export const animeDetailQuery = gql`
  query ($id: Int) {
    Media (id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      type
      genres
      bannerImage
      description
      episodes
    }
  }
`