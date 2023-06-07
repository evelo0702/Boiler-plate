import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";
function loginUser(dataToSubmit) {
  const req = axios
    .post("http://localhost:5000/api/users/login", dataToSubmit)
    .then((response) => response.data);
  console.log(req);

  return {
    type: LOGIN_USER,
    payload: req,
  };
}
function registerUser(dataToSubmit) {
  const req = axios
    .post("http://localhost:5000/api/users/register", dataToSubmit)
    .then((response) => response.data);
  console.log(req);

  return {
    type: REGISTER_USER,
    payload: req,
  };
}
export { loginUser, registerUser };
