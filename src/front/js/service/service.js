import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const createService = async (companyID, data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${URL}/services/${companyID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.log("Error to create service", err);
  }
};

export const listServiceByCompany = async (companyID) => {
  try {
    const res = await fetch(`${URL}/services/company/${companyID}`, {
      method: "GET",
      headers: HEADERS,
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log("Error to looking for Service List ByCompany", err);
  }
};
export const deleteServiceList = async (service_id) => {
  try {
    console.log(service_id, "id petition");
    const token = localStorage.getItem("token");
    console.log(token, "the token");
    const res = await fetch(`${URL}/services/${service_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    console.log(data.data, "data petition");
    return data.data;
  } catch (err) {
    console.log("Error deleting service by company", err);
  }
};
