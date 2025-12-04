import axiosInstance from "./axios";
import { routes } from "./routes";

export const checkUserLogin = (body) => {
  return axiosInstance({
    method: routes.LOGIN.METHOD,
    url: routes.LOGIN.URL,
    data: body,
  });
};

export const registerUser = (body) => {
  return axiosInstance({
    method: routes.REGISTER.METHOD,
    url: routes.REGISTER.URL,
    data: body,
  });
};

export const createTasks = (body) => {
  return axiosInstance({
    method: routes.CREATE_TASK.METHOD,
    url: routes.CREATE_TASK.URL,
    data: body,
  });
};


export const fetchTasks = () => {
  return axiosInstance({
    method: routes.FETCH_TASK.METHOD,
    url: routes.FETCH_TASK.URL,
  });
};

export const updateTask = (id, body) => {
  return axiosInstance({
    method: routes.UPDATE_TASK.METHOD,
    url: `${routes.UPDATE_TASK.URL}/${id}`,
    data: body,
  });
};

export const deleteTask = (id) => {
  return axiosInstance({
    method: routes.DELETE_TASK.METHOD,
    url: `${routes.DELETE_TASK.URL}/${id}`,
  });
};


export const updateProfile = (body) => {
  // The backend endpoint is /api/user/profile (no user id expected)
  // The server should use the Authorization token to identify the user.
  return axiosInstance({
    method: routes.UPDATE_PROFILE.METHOD,
    url: routes.UPDATE_PROFILE.URL,
    data: body,
  });
};
