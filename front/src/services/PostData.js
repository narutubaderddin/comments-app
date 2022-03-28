import { BaseURL } from "../config/config";

export function PostData(type, userData) {;
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
