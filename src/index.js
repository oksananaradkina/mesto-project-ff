import './pages/index.css';
import {createCard, deleteCardHandler, likeHandler} from "./scripts/card";
import {initProfile, updateProfile} from "./scripts/profile";
import {initialCards} from "./scripts/cards";
import {closeModal, showModal} from "./scripts/modal";

const cardContainer = document.querySelector('.places__list');
const buttonAddCard = document.querySelector('.profile__add-button');

export const modalTypes = {
    EDIT: 'edit',
    NEW_CARD: 'new_card',
    IMAGE: 'image'
}

function getModalEdit() {
    const modalWindow = document.querySelector('.popup_type_edit');
    return {
        window: modalWindow,
        form: modalWindow.querySelector('.popup__form'),

        fields: {
            name: modalWindow.querySelector('.popup__input_type_name'),
            description: modalWindow.querySelector('.popup__input_type_description')
        },
        buttons: {
            close: modalWindow.querySelector('.popup__close'),
        }
    }
}

function getModalNewCard() {
    const modalWindow = document.querySelector('.popup_type_new-card');
    return {
        window: modalWindow,
        form: modalWindow.querySelector('.popup__form'),
        fields: {
            place_name: modalWindow.querySelector('.popup__input_type_card-name'),
            link: modalWindow.querySelector('.popup__input_type_url')
        },
        buttons: {
            close: modalWindow.querySelector('.popup__close'),
        }
    }

}

function getModalImage() {
    const modalWindow = document.querySelector('.popup_type_image');
    return {
        window: modalWindow,
        items: {
            image: modalWindow.querySelector('.popup__image'),
            caption: modalWindow.querySelector('.popup__caption')
        },
        buttons: {
            close: modalWindow.querySelector('.popup__close'),
        }
    }
}

export const modalWindows = {
    [modalTypes.EDIT]: getModalEdit(),
    [modalTypes.NEW_CARD]: getModalNewCard(),
    [modalTypes.IMAGE]: getModalImage()
}

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

export function getModal(modalType) {
    return modalWindows[modalType]
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

function openImageHandler(event) {
    const image = event.target;

    const imageUrl = image.getAttribute('src');
    const name = image.getAttribute('alt');

    const modalWindow = getModal(modalTypes.IMAGE);

    modalWindow.items.image.setAttribute('src', imageUrl);
    modalWindow.items.image.setAttribute('alt', name);

    showModal(modalWindow);
}


initAddCard();
initProfile();
initProfileEdit();
addCards();