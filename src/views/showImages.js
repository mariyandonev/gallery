import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { showImages, deleteImage, likeImage } from "../api/data.js";

let context = null;
export async function showImagesView(ctx) {
    context = ctx;
    const data = await showImages();
    ctx.render(imagesTemplate(data, likePic));

    async function likePic(e) {
        const imageId = e.target.parentElement.parentElement.id;
        for (let image of data.results) {
            if (imageId === image.objectId) {
                if (e.target.classList.contains('liked-heart')) {
                    await likeImage(imageId, { isStarred: false });
                    e.target.classList.remove('liked-heart');
                    e.target.classList.add('heart');
                } else {
                    await likeImage(imageId, { isStarred: true });
                    e.target.classList.remove('heart');
                    e.target.classList.add('liked-heart');
                }
            }
        }
    }

    const imagesArr = Array.from(document.getElementsByTagName('img'));
    imagesArr.forEach(el => {
        el.addEventListener('click', function () {
            el.classList.toggle('big-image');
            el.classList.toggle('zoom-img');
        })
    });

}

function imagesTemplate(data, likePic) {
    return html`<section id="allImages">
    ${data ? Object.values(data.results).map(image => imageTemplate(image, likePic)) : nothing}
</section>`
}

function imageTemplate(data, likePic) {
    return html`
    <div class="wrapper" id=${data.objectId}>
        <div class="inner">
            <img class="zoom-img" src=${data.imageUrl} id=${data.objectId}>
        </div>
        <span>${data.name}</span>
        <div class="buttons">
            <button class=${data.isStarred ? "liked-heart" : "heart"} @click=${likePic}><i class="fa fa-regular fa-heart"></i></button>
            <button class="delete" @click=${deleteImage.bind(null, data.objectId, context)}><i
                    class="fa fa-solid fa-trash"></i></button>
        </div>
    </div>
    `;
}