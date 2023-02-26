export const login = () => {
  const hash: any = window.location.hash;
  let tokenLS: any = window.localStorage.getItem("token");
  if (!tokenLS && hash) {
    let tokenLS = hash //filtering the hash with strings methods
      .substring(1)
      .split("&")
      .find((elem: any) => elem.startsWith("access_token"))
      .split("=")[1];
    window.localStorage.setItem("token", tokenLS); //localstorage
    location.reload();
  }
  return tokenLS;
};

export const logout = (setToken: Function): void => {
  setToken(null);
  window.localStorage.removeItem("token");
  location.reload();
};
