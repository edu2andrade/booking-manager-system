import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createHaircutCheckout = async () => {
  try {
    const res = await fetch(`${URL}/checkout/haircut`, {
      method: "POST",
      headers: {
        ...HEADERS,
      },
    });
    const data = await res.json();
    console.log("back ---->", data);
    // window.location.href = data.url;
    return data;
  } catch (err) {
    console.log("Error in checkout", err);
  }
};
