import { create } from "apisauce";

const API = create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default {
  API,
};
