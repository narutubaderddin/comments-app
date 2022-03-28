import { BaseURL } from "../config/config";

export function GetData(type) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.code === 401) {
          localStorage.removeItem("token");
          window.location = "/";
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
