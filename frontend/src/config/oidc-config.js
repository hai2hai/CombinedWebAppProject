import Oidc from 'oidc-client';
import axios from "axios";

let config = {
  userStore: new Oidc.WebStorageStateStore({ store: window.sessionStorage }),
  authority: "https://localhost:5000/",
  client_id: "jsclient",
  response_type: "id_token token",
  redirect_uri: "http://localhost:3000/login.html",
  scope: "openid profile webappapi email role",
  filterProtocolClaims: false,
  post_logout_redirect_uri: "http://localhost:3000",
}

const mgr = new Oidc.UserManager(config);

export default mgr;

export const getUser = async () => {
  const user = await mgr.getUser();
  if (user) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
  }
  return user;
}