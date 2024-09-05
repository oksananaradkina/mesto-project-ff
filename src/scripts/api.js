const baseConfig = {
    host: 'https://mesto.nomoreparties.co',
    id: 'wff-cohort-21',
    token: '9c7c77e7-074c-48a7-957c-6b6c1ef95605'
}

const config = {
    baseUrl: `${baseConfig.host}/v1/${baseConfig.id}`,
    headers: {
        authorization: baseConfig.token,
        'Content-Type': 'application/json'
    }
}

function createUrl(path) {
    const url = `${config.baseUrl}/${path.join('/')}`;
    return url
}

function request(resource, method, data) {
    const path = [resource];
    const {headers} = config;
    const options = {headers, method};

    switch (method) {
        case 'GET':
        case 'PUT':
        case 'DELETE':
            path.push(data);
            break;
        case 'POST':
        case 'PATH':

            options.body = JSON.stringify(data)
            break;
    }


    return new Promise((resolve, reject) => {
        fetch(createUrl(path), options)
            .then(res => {
                if (res.ok) {
                    resolve(res.json())
                } else {
                    reject(res)
                }
            })
            .catch((error) => reject(error))
    })
}

export const loadInitialCards = () => request('cards')
export const updateProfile = (profile) => request('users/me', 'PATCH', profile)
export const loadProfile = () => request('users/me', 'GET');
export const saveNewCard = (card) => request('cards', 'POST', card);
export const deleteCard = (id) => request('cards', 'DELETE', id);
export const addLike = (id) => request('cards/likes', 'PUT', id);
export const deleteLikes = (id) => request('cards/likes', 'DELETE', id);
export const saveAvatar = (avatar) => request('users/me/avatar', 'PATCH', avatar);

export function requestError(message, error) {
    console.error('[REQUEST ERROR]', message, error);
}