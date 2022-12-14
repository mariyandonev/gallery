const host = 'https://parseapi.back4app.com';
const appId = 'TeOFYoxyLJE7KXvxKNnNH9zc9oEDmz4Ho8L3lzTD';
const apiKey = 'F8AK4CgClJjH2M2nlSb94ihXrDqxP4kHWQ1PDRfo';

async function request(url = '/', options) {
    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        try {
            if (response.status === 204) {
                return response;
            }

            const data = await response.json();
            return data;
        } catch (err) {
            alert(err.message);
            return false;
        }
    } catch (err) {
        alert(err.message);
        return false;
    }
}

function getOptions(method, body) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': apiKey
        }
    }

    if (body) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions('GET'));
}

export async function post(url, body) {
    return await request(url, getOptions('POST', body));
}

export async function put(url, body) {
    return await request(url, getOptions('PUT', body));
}

export async function del(url) {
    return await request(url, getOptions('DELETE'));
}