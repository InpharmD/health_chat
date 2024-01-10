export function getToken() {
    let TokenPresent;
    if (typeof localStorage !== "undefined") {
      const isTokenPresent = JSON.parse(localStorage.getItem("LoginCreds"));
      TokenPresent = isTokenPresent?.data;
    }
    return TokenPresent;
  }
  