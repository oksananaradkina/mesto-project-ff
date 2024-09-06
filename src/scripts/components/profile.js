import {requestError, saveAvatar, updateProfile} from "../api";

import {closeModal, showModal} from "../modal";
import {MODAL_TYPES, MODAL_WINDOWS, PROFILE_SECTION} from "../constants";
import {clearValidation} from "../validation";


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
    PROFILE_SECTION.fields.avatarEdit.addEventListener('click', avatarClickHandler);
}

function editProfileButtonClickHandler(event) {
    const name = PROFILE_SECTION.fields.name.textContent;
    const description = PROFILE_SECTION.fields.about.textContent;
    openProfileEdit(name, description)
}

function openProfileEdit(name, about) {
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.EDIT];
    clearValidation( modalWindow.modalWindow)
    modalWindow.fields.name.value = name;
    modalWindow.fields.about.value = about;

    showModal(modalWindow);
}

export function saveProfileClickHandler(event) {
    event.preventDefault();
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.EDIT];
    const name = modalWindow.fields.name.value;
    const about = modalWindow.fields.about.value;
    modalWindow.buttons.submit.textContent = 'Сохранить...';
    updateProfile({name, about})
        .then((profile) => {
            setProfileFields(profile);
            closeModal(modalWindow);
        })
        .catch((error) => {
            requestError('Profile not updated.', error);
        })
        .finally(() =>{
            modalWindow.buttons.submit.textContent = 'Сохранить';
        })

}

export function setProfileFields({name, about}) {
    PROFILE_SECTION.fields.name.textContent = name;
    PROFILE_SECTION.fields.about.textContent = about;
}


export function showProfile(profile) {
    PROFILE_SECTION.fields.avatar.setAttribute('src', profile.avatar);
    PROFILE_SECTION.fields.name.textContent = profile.name;
    PROFILE_SECTION.fields.about.textContent = profile.about;
}
