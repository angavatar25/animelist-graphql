import axiosInstance from "../axiosInstance";

enum FetchMethod {
  POST = 'POST',
};

export const useRequester = () => {
  const query = `
  query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
    }
  }
  `;
  axiosInstance({ method: FetchMethod.POST, data: { query } })
    .then((res) => {
      console.log(res)
    })
};