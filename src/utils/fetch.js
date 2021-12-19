export const backURL = process.env.REACT_APP_BACK_URL;

// GET fetch
export async function getData(endpoint, token = false) {
    let options = {};
    if(token) {
        options.headers = {
            Authorization: `Bearer ${token}`,
        }
    }
    const res = await fetch(backURL + `${endpoint}/`, options);
    const data = await res.json();
    return data;
}

export async function postData(endpoint, body, token) {
    const res = await fetch(backURL + `${endpoint}/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return data;
}

// POST fetch sans content-type header
export async function postMultiPartData(endpoint, formData, token) {
    const res = await fetch(backURL + `${endpoint}/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    const data = await res.json();
    return data;
}