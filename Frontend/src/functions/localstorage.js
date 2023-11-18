export const setLocalstorageData = (data, value) => {
  localStorage.setItem(data, value);
};

export const getLocalstorageData = (data) => {
  return localStorage.getItem(data);
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const setUserMail = (email) => {
  localStorage.setItem("email", email)
}

export const getToken = () => {
  try{
    return localStorage.getItem("token");
  }
  catch{
    return false;
  }
};

export const getEmail = () => {
  try {
    return localStorage.getItem("email");
  } catch {
    return false;
  }
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const deleteEmail = () => {
  localStorage.removeItem("email");
};
