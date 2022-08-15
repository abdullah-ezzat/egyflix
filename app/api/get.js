import client from "./client";

const API = client.API;

const getData = (action, page) => API.get(`get/${action}/pages=${page}`);

const getMovie = (link) => API.post("search/movie/None", { link: link });

export default {
  getData,
  getMovie,
};
