import client from "./client";

const API = client.API;

const getData = (action, page) => API.get(`get/${action}/pages=${page}`);

const getDetails = (link) => API.post("search/details/None", { link: link });

const getEpisodes = (link) => API.post("series/episodes", { link: link });

const getLinks = (link) => API.post("get/links", { link: link });

const search = (search) => API.get(`search/${search}`);

export default {
  getData,
  getDetails,
  getEpisodes,
  getLinks,
  search,
};
