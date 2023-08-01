import { useState } from "react";
import axiosInstance from "../axiosInstance";

enum FetchMethod {
  POST = 'POST',
};

const useRequester = () => {

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
          }
        }
      }
    `;

    const variables = {
      page: 1,
      perPage: 3,
    };

    axiosInstance({ method: FetchMethod.POST, data: { query, variables } })
      .then((res: any) => {
        console.log(res)
      })
  }

  return {
    fetchAnimeList,
  };
};

export default useRequester;