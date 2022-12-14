import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { showModal } from './views/addImage.js';
import { showImagesView } from './views/showImages.js';

const main = document.getElementById('main-content');

page('/', middleware, showImagesView);

page.start();
showModal();

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
}
