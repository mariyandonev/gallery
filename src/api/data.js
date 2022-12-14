import * as api from './api.js';

const endpoint = {
    'addImage': '/classes/images',
    'showImages': '/classes/images',
    'deleteImage': '/classes/images/',
    'addLike': '/classes/images/'
}

export async function showImages() {
    const res = await api.get(endpoint.showImages);
    return res;
}

export async function addImage(name, imageUrl) {
    const res = await api.post(endpoint.addImage, { name, imageUrl });
    return res;
}

export async function deleteImage(id, ctx) {
    const choice = confirm('Are you sure you want to delete this image?');
    if (choice) {
        const res = await api.del(endpoint.deleteImage + id);
        ctx.page.redirect('/');
        return res;
    }
}

export async function likeImage(id, { isStarred }) {
    const res = await api.put(endpoint.addLike + id, { isStarred });
    return res;
}
