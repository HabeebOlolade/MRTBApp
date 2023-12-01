import { registrantStoreActions } from "../slices/registrant";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";

function fetchRegistrants() {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(registrantStoreActions.setLoading(true));
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const result = await response.json();
      dispatch(registrantStoreActions.setRegistrantsRepo(result));
      dispatch(registrantStoreActions.setRegistrants(result));
    } catch (err) {
      toast.error("error occured while fetching registrants");
    } finally {
      dispatch(registrantStoreActions.setLoading(false));
    }
  };
}

export { fetchRegistrants };
