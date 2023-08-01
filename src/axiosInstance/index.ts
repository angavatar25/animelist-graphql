import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://graphql.anilist.co',
});

export default axiosInstance;