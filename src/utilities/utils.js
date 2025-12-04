export const isSuccess = (response) => {
  if (!response) return false;

  const { status, data } = response;

  // Check status code
  const validStatus = status >= 200 && status < 300;

  // Check data is not null/undefined/empty
  const validData =
    data !== null &&
    data !== undefined &&
    !(typeof data === "object" && Object.keys(data).length === 0);

  return validStatus && validData;
};




export const getUserDetails = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    // JWT = header.payload.signature → split by "."
    const payload = token.split(".")[1];
    if (!payload) return null;

    // Decode base64 payload
    const decoded = atob(payload);

    // Convert JSON string → object
    const user = JSON.parse(decoded);

    return user;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

