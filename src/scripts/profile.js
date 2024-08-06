import {getModal, modalTypes, showModal} from "./modal";

function getProfile() {
    const profileInfo = document.querySelector('.profile__info');
    return {
        window: profileInfo,
        fields: {
            name: profileInfo.querySelector('.profile__title'),
            description: profileInfo.querySelector('.profile__description'),
        }
    }
}


const profileSection = getProfile();

function buttonEditClickHandler(event) {
    const name = profileSection.fields.name.textContent;
    const description = profileSection.fields.description.textContent;
    openProfileEdit(name, description)
}

export function updateProfile(name, description) {
    profileSection.fields.name.textContent = name;
    profileSection.fields.description.textContent = description;
}

function openProfileEdit(name, description) {
    const modalWindow = getModal(modalTypes.EDIT);

    modalWindow.fields.name.value = name;
    modalWindow.fields.description.value = description;

    showModal(modalWindow);
}

export function initProfile() {
    const buttonEdit = document.querySelector('.profile__edit-button');
    buttonEdit.addEventListener('click', buttonEditClickHandler)
}