import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const getInfoCompanyByUserId = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/company/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    return await res.json();
  } catch (err) {
    console.log("Error To Get Info Company By User Id", err);
  }
};

export const listCompanies = async () => {
  try {
    const res = await fetch(`${URL}/company/all`, {
      method: "GET",
      headers: HEADERS,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error to get companies", err);
  }
};

export const getCompanyById = async (companyId) => {
  try {
    const res = await fetch(`${URL}/company/${companyId}`, {
      method: "GET",
      headers: HEADERS,
    });
    return await res.json(res);
  } catch (error) {
    console.log("Error to get company", error);
  }
};
