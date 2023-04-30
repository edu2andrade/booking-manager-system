import { URL } from '.';


const HEADERS = {
    "Content-Type": "application/json"
};


export const registerUser = async (user) => {
    try {
        const res = await fetch(`${URL}/users/register`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(user)
        });
        const data = await res.json();
        console.log(data)
    } catch (err) {
        console.log("Error Register User", err)
    }
};

export const loginUser = async (user) => {
    try {
        const res = await fetch(`${URL}/users/login`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(user)
        });
        const data = await res.json();
        console.log(data)
    } catch (err) {
        console.log("Error Login User", err)
    }
};

