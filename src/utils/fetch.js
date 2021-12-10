const backURL = process.env.REACT_APP_BACK_URL;

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
    console.log(data);
    return data;
}

// POST fetch
export async function postData(endpoint, body) {
    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
    }
    const res = await fetch(backURL + `${endpoint}/`, options);
    const data = await res.json();
    console.log(data);
    return data;
}