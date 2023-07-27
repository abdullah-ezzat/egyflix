import { create } from "apisauce";
import client from "./client";
import key from "./enviroment";

const API = client.API;
const KEY = key.secret;

const getData = (type, category, page, args = "") =>
  API.get(`${type}/${category}${KEY}&page=${page}${args}`);

const getDetails = (type, id) => API.get(`${type}/${id}${KEY}`);

const getCasting = (type, id) => API.get(`${type}/${id}/credits${KEY}`);

const getVideos = (type, id) => API.get(`${type}/${id}/videos${KEY}`);

const searchData = (search, page) =>
  API.get(
    `search/multi${KEY}&query=${search}&page=${page}&include_adult=false`
  );

const YTS = create({
  baseURL: "https://seapi.link/",
});

const getMovieDownload = (id) => YTS.get(`?type=tmdb&id=${id}&max_results=1`);
const getSeriesDownload = (id, season, episode) =>
  YTS.get(
    `?type=tmdb&id=${id}&season=${season}&episode=${episode}&max_results=1`
  );

export default {
  getData,
  getDetails,
  getCasting,
  getVideos,
  getMovieDownload,
  getSeriesDownload,
  searchData,
};
