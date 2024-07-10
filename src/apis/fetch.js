const BASE_URL = "http://localhost:8080";

export const http = {
  get: async function (url) {
    const response = await fetch(`${BASE_URL}${url}`, { method: "GET" });

    if (!response.ok) {
      throw new Error("request failed.");
    }

    try {
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("json parse error.");

      return null;
    }
  },
};
