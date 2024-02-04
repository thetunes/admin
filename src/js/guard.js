console.log("guard.js script loaded");

import { token } from "./controller/cookies.js";

if (!token) {
  window.location.replace("/gate/");
}