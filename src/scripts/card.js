import {showModal} from "./modal";
import {getModal, modalTypes} from "../index";

function getCardTemplate() {
    const card = document.querySelector('#card-template').content.cloneNode(true);
    return {
        card,
        image: card.querySelector('.card__image'),
        title: card.querySelector('.card__title'),
        buttons: {
            delete: card.querySelector('.card__delete-button'),
            like: card.querySelector('.card__like-button')
        }
    }
}

export function createCard(cardData, deleteCallback, openImageCallback, likeCallback) {
    const template = getCardTemplate()

    const img = template.image;
    img.setAttribute('src', cardData.link);
    img.setAttribute('alt', cardData.name)
    img.addEventListener('click', openImageCallback);

    template.title.textContent = cardData.name;

    template.buttons.delete.addEventListener('click', deleteCallback);
    template.buttons.like.addEventListener('click', likeCallback);

    return template;
}

export function deleteCardHandler(event) {
    const card = event.target.closest('.card');
    card.remove();
}

export function likeHandler(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_is-active')
}

