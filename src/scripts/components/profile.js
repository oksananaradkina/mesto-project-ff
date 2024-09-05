import {requestError, saveAvatar, updateProfile} from "../api";

import {closeModal, showModal} from "../modal";
import {MODAL_TYPES, MODAL_WINDOWS, PROFILE_SECTION} from "../constants";


export function avatarClickHandler(event) {
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.AVATAR];
    modalWindow.fields.link.vablue = PROFILE_SECTION.fields.avatar.getAttribute('src');
    showModal(modalWindow)
}

export function saveAvatarClickHandler(event) {
    event.preventDefault();

    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.AVATAR];
    const avatar = modalWindow.fields.link.value;

    saveAvatar(avatar)
        .then((res) => {
            PROFILE_SECTION.fields.avatar.setAttribute('src', res.avatar);
            closeModal(modalWindow);
        })
        .catch((error) => {
            requestError('Avatar not saved.', error);
        })
}

export function initProfile() {
    const buttonEdit = document.querySelector('.profile__edit-button');
    buttonEdit.addEventListener('click', editProfileButtonClickHandler);
    PROFILE_SECTION.fields.avatar_edit.addEventListener('click', avatarClickHandler);
}

function editProfileButtonClickHandler(event) {
    const name = PROFILE_SECTION.fields.name.textContent;
    const description = PROFILE_SECTION.fields.description.textContent;
    openProfileEdit(name, description)
}

function openProfileEdit(name, description) {
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.EDIT];

    modalWindow.fields.name.value = name;
    modalWindow.fields.description.value = description;

    showModal(modalWindow);
}

export function saveProfileClickHandler(event) {
    event.preventDefault();
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.EDIT];
    const name = modalWindow.fields.name.value;
    const description = modalWindow.fields.description.value;
    modalWindow.buttons.submit.textContent = 'Сохранить...';
    updateProfile({name, description})
        .then(() => {
            setProfileFields(name, description);
            modalWindow.buttons.submit.textContent = 'Сохранить';
            closeModal(modalWindow);
        })
        .catch((error) => {
            requestError('Profile not updated.', error);
        })
}

export function setProfileFields(name, description) {
    PROFILE_SECTION.fields.name.textContent = name;
    PROFILE_SECTION.fields.description.textContent = description;
}


export function showProfile(profile) {
    PROFILE_SECTION.fields.avatar.setAttribute('src', profile.avatar);
    PROFILE_SECTION.fields.name.textContent = profile.name;
    PROFILE_SECTION.fields.description.textContent = profile.about;
}
