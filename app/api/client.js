import { create } from "apisauce";
import * as base from "./enviroment.json";

const API = create({
  baseURL: base["url"],
});

export default {
  API,
};
