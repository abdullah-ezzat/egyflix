import { create } from "apisauce";
import base from "./enviroment.js";

let API = create({
  baseURL: base.url,
});

export default {
  API,
};
