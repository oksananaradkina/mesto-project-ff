import {deleteCard, deleteLikes, requestError, saveNewCard, addLike} from "../api";
import {CARD_CONTAINER, MODAL_TYPES, MODAL_WINDOWS, PROFILE, PROFILE_SECTION} from "../constants";
import {closeModal, showModal} from "../modal";

function getCardTemplate() {
    const template = document.querySelector('#card-template').content.cloneNode(true);
    return {
        card: template.querySelector('.card'),
        image: template.querySelector('.card__image'),
        title: template.querySelector('.card__title'),
        like_count: template.querySelector('.card__like-count'),
        buttons: {
            delete: template.querySelector('.card__delete-button'),
            like: template.querySelector('.card__like-button')
        }
    }
}

function openImageHandler(event) {
    const image = event.target;

    const imageUrl = image.getAttribute('src');
    const name = image.getAttribute('alt');

    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.IMAGE];

    modalWindow.items.image.setAttribute('src', imageUrl);
    modalWindow.items.image.setAttribute('alt', name);
    modalWindow.items.caption.textContent = name;


    showModal(modalWindow);
}


function getCardData(modalWindow, owner) {
    const name = modalWindow.fields.placeName.value;
    const link = modalWindow.fields.link.value;
    const likes = [];

    return {name, link, likes, owner};
}

function addNewCard(modalWindow, owner) {
    const cardData = getCardData(modalWindow, owner);
    saveNewCard(cardData)
        .then(() => {
            const newCard = createCard(owner, cardData, deleteCardHandler, openImageHandler, likeHandler);
            CARD_CONTAINER.prepend(newCard.card);

            modalWindow.fields.placeName.value = '';
            modalWindow.fields.link.value = '';
            closeModal(modalWindow);
        })
        .catch((error) => {
            requestError('Nev card not added.', error);
        })
}

export function saveCardClickHandler(event) {
    event.preventDefault();
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.NEW_CARD];
    addNewCard(modalWindow, PROFILE);
}

export function addCards(cards, profile) {
    cards.forEach((card) => {
        const newCard = createCard(profile, card, deleteCardHandler, openImageHandler, likeHandler);
        CARD_CONTAINER.append(newCard.card);
    })
}

export function createCard(profile, cardData, deleteCallback, openImageCallback, likeCallback) {

    const template = getCardTemplate()

    const img = template.image;
    img.setAttribute('src', cardData.link);
    img.setAttribute('alt', cardData.name)
    img.addEventListener('click', openImageCallback);

    template.title.textContent = cardData.name;

    if (profile._id !== cardData.owner._id) {
        template.buttons.delete.remove();
    } else {
        template.buttons.delete.addEventListener('click', deleteCallback);
    }

    template.buttons.like.addEventListener('click', likeCallback);
    template.like_count.textContent = cardData.likes.length;
    template.card.setAttribute('data-id', cardData._id)
    return template;
}

export function deleteCardHandler(event) {
    const card = event.target.closest('.card');
    const id = card.getAttribute('data-id')

    deleteCard(id).then(() => {
        card.remove();
    })
        .catch((error) => {
            requestError('Card not deleted.', error);
        })
}

export function likeHandler(event) {
    const likeButton = event.target;
    const card = event.target.closest('.card');
    const id = card.getAttribute('data-id')
    const activeClass = 'card__like-button_is-active'
    const likeCount = card.querySelector('.card__like-count');

    if (likeButton.classList.contains(activeClass)) {
        deleteLikes(id)
            .then((res) => {
            likeButton.classList.remove(activeClass);
            likeCount.textContent = res.likes.length;
        })
            .catch((error) => {
                requestError('Like not deleted.', error);
            })
    } else {
        addLike(id)
            .then((res) => {
            likeButton.classList.add(activeClass);
            likeCount.textContent = res.likes.length;
        })
            .catch((error) => {
                requestError('Like not added.', error);
            })
    }
}

