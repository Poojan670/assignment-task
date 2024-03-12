export const fetchGetRequest = async (url: string) => {
  try {
    const token = localStorage.getItem("token") || null;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(url, {
      headers: headers,
    });
    if (!response.ok || response.status != 201) {
      throw new Error(`Error occurred, ${response}`);
    }
  } catch (error) {
    console.error("Error in fetch", error);
    throw error;
  }
};

export const fetchPostRequest = async (url: string, payload: BodyInit) => {
  try {
    const token = localStorage.getItem("token") || null;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: payload,
    });
    if (!response.ok || response.status != 201) {
      throw new Error(`Error occurred, ${response}`);
    }
  } catch (error) {
    console.error("Error in fetch", error);
    throw error;
  }
};
