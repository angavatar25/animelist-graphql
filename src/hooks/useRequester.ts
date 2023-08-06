import { useState } from "react";
import axiosInstance from "../axiosInstance";

enum FetchMethod {
  POST = 'POST',
};

interface IVariables {
  page: number,
  perPage: number,
}

interface IAnimeDataList {
  Page?: {
    pageInfo: object,
    media: Array<[]>,
  };
}

interface IAnimeDetail {
  Media?: {
    id: number,
    title?: {
      english?: string,
    },
    type: string,
    genres: Array<[]>,
    bannerImage: string,
    description: string | TrustedHTML,
    episodes: number | null,
  };
}

const useRequester = () => {
  const [animeDataList, setAnimeDataList] = useState<IAnimeDataList | null>(null);
  const [animeDetail, setAnimeDetail] = useState<IAnimeDetail | null>(null);
  const fetchAnimeList = () => {
    const query = `
      query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
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
    `;

    const variables: IVariables = {
      page: 1,
      perPage: 10,
    };

    axiosInstance({ method: FetchMethod.POST, data: { query, variables } })
      .then((res) => {
        if (res && res.data) {
          setAnimeDataList(res.data.data);
        }
      })
  }

  const fetchAnimeDetail = (animeId: number) => {
    const query = `
    query ($id: Int) { # Define which variables will be used in the query (id)
      Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
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
    }`

    const variables = {
      id: animeId,
    };

    axiosInstance({ method: FetchMethod.POST, data: { query, variables }})
      .then((res) => {
        if (res && res.data) {
          setAnimeDetail(res.data.data);
        }
      })
  }

  return {
    fetchAnimeList,
    fetchAnimeDetail,
    animeDataList,
    animeDetail,
  };
};

export default useRequester;