import {showModal} from "./modal";

function buttonEditClickHandler(event) {
    const profileInfo = document.querySelector('.profile__info');
    const name = profileInfo.querySelector('.profile__title').textContent;
    const description = profileInfo.querySelector('.profile__description').textContent;
    openProfileEdit(name, description)
}

function openProfileEdit(name, description) {
    const modalWindow = showModal('.popup_type_edit')
    const inputName = modalWindow.querySelector('.popup__input_type_name');
    const inputDescription = modalWindow.querySelector('.popup__input_type_description');
    inputName.value = name;
    inputDescription.value = description;
}

export function initProfile() {
    const buttonEdit = document.querySelector('.profile__edit-button');
    buttonEdit.addEventListener('click', buttonEditClickHandler)
}