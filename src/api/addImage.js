import { addImage } from "../api/data.js";

const modal = document.getElementsByClassName('modal')[0];
const form = document.getElementById('myForm');
form.addEventListener('submit', submitImage);

export function showModal() {
    const closeBtn = document.getElementsByClassName('close')[0];

    document.getElementById('add-btn').addEventListener('click', function () {
        modal.style.display = "block";
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }

    window.onclick = function(e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

}

async function submitImage(e) {
    const form = new FormData(e.target);
    const { name, imageUrl } = Object.fromEntries(form);
    console.log(name, imageUrl);

    if (name.length == 0 || imageUrl.length == 0) {
        alert("All fields are mandatory!");
        e.preventDefault();
        return false;
    } else {
        await addImage(name, imageUrl);
        modal.style.display = "none";
    }

}

