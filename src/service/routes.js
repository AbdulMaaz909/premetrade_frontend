const auth = {
  LOGIN: {
    URL: "/api/auth/login",
    METHOD: "POST",
  },
  REGISTER: {
    URL: "/api/auth/register",
    METHOD: "POST",
  },
};
const dashboardRoutes = {
  CREATE_TASK: {
    URL: "/api/task",
    METHOD: "POST",
  },
  FETCH_TASK: {
    URL: "/api/task",
    METHOD: "GET",
  },
  UPDATE_TASK: {
    URL: "/api/task",
    METHOD: "PUT",
  },
  DELETE_TASK: {
    URL: "/api/task",
    METHOD: "DELETE",
  },
};

  const updateProfileRoute = {
    UPDATE_PROFILE: {
      URL: "/api/user/profile",
      METHOD: "PUT",
    }
  }


export const routes = { ...auth, ...dashboardRoutes, ...updateProfileRoute };
