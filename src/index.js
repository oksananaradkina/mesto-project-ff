import './pages/index.css';
import {createCard, deleteCardHandler, likeHandler} from "./scripts/card";
import {initialCards} from "./scripts/cards";
import {closeModal, createHandlers, showModal} from "./scripts/modal";

const cardContainer = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');

export const modalTypes = {
    EDIT: 'edit',
    NEW_CARD: 'new_card',
    IMAGE: 'image'
}

export const modalWindows = {
    [modalTypes.EDIT]: getModalEdit(),
    [modalTypes.NEW_CARD]: getModalNewCard(),
    [modalTypes.IMAGE]: getModalImage()
}

const profileSection = getProfile();

function getProfile() {
    const profileInfo = document.querySelector('.profile__info');
    return {
        fields: {
            name: profileInfo.querySelector('.profile__title'),
            description: profileInfo.querySelector('.profile__description'),
        }
    }
}

export function updateProfile(name, description) {
    profileSection.fields.name.textContent = name;
    profileSection.fields.description.textContent = description;
}

function openProfileEdit(name, description) {
    const modalWindow = modalWindows[modalTypes.EDIT];

    modalWindow.fields.name.value = name;
    modalWindow.fields.description.value = description;

    showModal(modalWindow);
}

function getModalEdit() {
    const modalWindowElement = document.querySelector('.popup_type_edit');
    const data = {
        modalWindow: modalWindowElement,
        form: modalWindowElement.querySelector('.popup__form'),
        fields: {
            name: modalWindowElement.querySelector('.popup__input_type_name'),
            description: modalWindowElement.querySelector('.popup__input_type_description')
        },
        buttons: {
            close: modalWindowElement.querySelector('.popup__close'),
        }
    }
    data.handlers = createHandlers(data, saveProfileClickHandler);

    return data;
}

function getModalNewCard() {
    const modalWindowElement = document.querySelector('.popup_type_new-card');
    const data = {
        modalWindow: modalWindowElement,
        form: modalWindowElement.querySelector('.popup__form'),
        fields: {
            place_name: modalWindowElement.querySelector('.popup__input_type_card-name'),
            link: modalWindowElement.querySelector('.popup__input_type_url')
        },
        buttons: {
            close: modalWindowElement.querySelector('.popup__close'),
        }
    }
    data.handlers = createHandlers(data, saveCardClickHandler);

    return data;
}

function getModalImage() {
    const modalWindowElement = document.querySelector('.popup_type_image');
    const data = {
        modalWindow: modalWindowElement,
        items: {
            image: modalWindowElement.querySelector('.popup__image'),
            caption: modalWindowElement.querySelector('.popup__caption')
        },
        buttons: {
            close: modalWindowElement.querySelector('.popup__close'),
        },
        handlers: createHandlers(modalWindowElement)
    }
    data.handlers = createHandlers(data);

    return data;
}

export function initAddCard() {
    buttonAddCard.addEventListener('click', addCardClickHandler);
}

export function initProfile() {
    const buttonEdit = document.querySelector('.profile__edit-button');
    buttonEdit.addEventListener('click', editButtonClickHandler)
}

function editButtonClickHandler(event) {
    const name = profileSection.fields.name.textContent;
    const description = profileSection.fields.description.textContent;
    openProfileEdit(name, description)
}

export function addCards() {
    initialCards.forEach((card) => {
        const newCard = createCard(card, deleteCardHandler, openImageHandler, likeHandler);
        cardContainer.append(newCard.card);
    })
}

function openModalAddCard() {
    const modalWindow = modalWindows[modalTypes.NEW_CARD]
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

function openImageHandler(event) {
    const image = event.target;

    const imageUrl = image.getAttribute('src');
    const name = image.getAttribute('alt');

    const modalWindow = modalWindows[modalTypes.IMAGE];

    modalWindow.items.image.setAttribute('src', imageUrl);
    modalWindow.items.image.setAttribute('alt', name);
    modalWindow.items.caption.textContent = name;


    showModal(modalWindow);
}

initAddCard();
initProfile();
addCards();