import './pages/index.css';
import {createCard, deleteCardHandler, likeHandler, openImageHandler} from "./scripts/card";
import {initProfile, updateProfile} from "./scripts/profile";
import {initialCards} from "./scripts/cards";
import {closeModal, getModal, modalTypes, modalWindows, showModal} from "./scripts/modal";

const cardContainer = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');

export function initAddCard() {
    buttonAddCard.addEventListener('click', addCardClickHandler);
    const modalWindow = modalWindows[modalTypes.NEW_CARD];
    modalWindow.form.addEventListener('submit', saveCardClickHandler);
}

export function initProfileEdit() {
    const modalWindow = modalWindows[modalTypes.EDIT];
    modalWindow.form.addEventListener('submit', saveProfileClickHandler);
}

export function addCards() {
    initialCards.forEach((card) => {
        const newCard = createCard(card, deleteCardHandler, openImageHandler, likeHandler);
        cardContainer.append(newCard.card);
    })
}

export function openModalImage(imageUrl, name) {
    const modalWindow = getModal(modalTypes.IMAGE);

    modalWindow.items.image.setAttribute('src', imageUrl);
    modalWindow.items.image.setAttribute('alt', name);

    showModal(modalWindow);
}

function openModalAddCard() {
    const modalWindow = getModal(modalTypes.NEW_CARD)
    showModal(modalWindow);
}

export function addCardClickHandler(event) {
    openModalAddCard();
}

function saveCardClickHandler(event) {
    event.preventDefault();
    const modalWindow = modalWindows[modalTypes.NEW_CARD];
    saveNewCard(modalWindow);
}

function saveProfileClickHandler(event) {
    event.preventDefault();
    const modalWindow = modalWindows[modalTypes.EDIT];
    const name = modalWindow.fields.name.value;
    const description = modalWindow.fields.description.value;
    updateProfile(name, description);
    closeModal(modalWindow);
}

function saveNewCard(modalWindow) {
    const name = modalWindow.fields.place_name.value;
    const link = modalWindow.fields.link.value;

    const newCard = createCard({name, link}, deleteCardHandler, openImageHandler, likeHandler);
    cardContainer.prepend(newCard.card);

    modalWindow.fields.place_name.value = '';
    modalWindow.fields.link.value = '';
    closeModal(modalWindow);
}


initAddCard();
initProfile();
initProfileEdit();
addCards();