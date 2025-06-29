import { AppDispatch } from "../../store";
import { logout } from "./authSlice";

export const logoutUser = () => (dispatch: AppDispatch) => {

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");

  dispatch(logout());
};
