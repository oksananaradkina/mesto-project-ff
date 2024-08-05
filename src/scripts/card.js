import {initialCards} from "./cards";
import {closeModal, showModal} from "./modal";

function createCard(card, deleteCallback, openImageCallback, likeCallback) {
    const template = document.querySelector('#card-template').content.cloneNode(true);

    const img = template.querySelector('.card__image');
    img.setAttribute('src', card.link);
    img.setAttribute('alt', card.name)
    img.addEventListener('click', openImageCallback)

    const title = template.querySelector('.card__title')
    title.textContent = card.name;

    const buttonDelete = template.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', deleteCallback);

    const buttonLike = template.querySelector('.card__like-button');
    buttonLike.addEventListener('click', likeCallback);

    return template;
}

export function addCards() {
    const cardContainer = document.querySelector('.places__list');
    initialCards.forEach((card) => {
        const cardNode = createCard(card, cardDeleteHandler, openImageHandler, likeHandler);
        cardContainer.append(cardNode);
    })
}

function cardDeleteHandler(event) {
    event.target.closest('.card').remove();
}

function openImageHandler(event) {
    const imageUrl = event.target.getAttribute('src');
    openModalImage(imageUrl)
}

function likeHandler(event) {
    event.target.classList.toggle('card__like-button_is-active')
}

function openModalImage(imageUrl) {
    const modalWindow = showModal('.popup_type_image')
    const image = modalWindow.querySelector('.popup__image');
    image.setAttribute('src', imageUrl);
}
function openModalAddCard(){
    const modalWindow = showModal('.popup_type_new-card');
}

function  addCardClickHandler(event){
    openModalAddCard();
}

export function initAddCard(){
    const buttonAdd = document.querySelector('.profile__add-button')
    buttonAdd.addEventListener('click', addCardClickHandler)
}

function saveCardClickHandler(event){
    const buttonSubmit = event.target;
    const modalWindow = buttonSubmit.closest('.popup_type_new-card');
    saveNewCard(modalWindow)
}

function saveNewCard(modalWindow){
    const inputName = modalWindow.querySelector('.popup__input_type_card-name');
    const inputLink = modalWindow.querySelector('.popup__input_type_url');
    const name = inputName.value;
    const link = inputLink.value;

    const card = createCard( {name, link}, cardDeleteHandler, openImageHandler, likeHandler);
    const cardContainer = document.querySelector('.places__list');
    cardContainer.prepend(card);

inputName.value = '';
inputLink.value = '';
closeModal(modalWindow);
}

export function initCardEdit(){
    const modalWindow = document.querySelector('.popup_type_new-card');
    const buttonSubmit = modalWindow.querySelector('.popup__button');
    buttonSubmit.addEventListener('click', saveCardClickHandler)
}