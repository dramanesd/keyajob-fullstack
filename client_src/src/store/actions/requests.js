import { apiCall } from "../../services/api";
import { addError } from "./errors";

export const postNewRequest = (request) => (dispatch) => {
  return apiCall("post", `/requests/new`, request)
    .then((res) => {})
    .catch((err) => {
      dispatch(addError(err.message));
    });
};
