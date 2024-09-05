import {createHandlers} from "./modal";
import {saveAvatarClickHandler, saveProfileClickHandler} from "./components/profile";
import {saveCardClickHandler} from "./components/card";


export const CARD_CONTAINER = document.querySelector('.places__list');
export const buttonAddCard = document.querySelector('.profile__add-button');
export let PROFILE;

export function setGlobalProfile(profile) {
    PROFILE = profile;

}


export const MODAL_TYPES = {
    EDIT: 'edit',
    NEW_CARD: 'new_card',
    IMAGE: 'image',
    AVATAR: 'avatar'
}


export const MODAL_WINDOWS = {
    [MODAL_TYPES.EDIT]: getModalEdit(),
    [MODAL_TYPES.NEW_CARD]: getModalNewCard(),
    [MODAL_TYPES.IMAGE]: getModalImage(),
    [MODAL_TYPES.AVATAR]: getModalAvatar()
}

export const PROFILE_SECTION = getProfile();

function getProfile() {
    const profileInfo = document.querySelector('.profile');
    return {
        fields: {
            avatar: profileInfo.querySelector('.profile__avatar'),
            avatar_edit: profileInfo.querySelector('.profile__avatar_icon_edit'),
            name: profileInfo.querySelector('.profile__title'),
            description: profileInfo.querySelector('.profile__description'),
        }
    }
}

function getModalEdit() {
    const modalWindowElement = document.querySelector('.popup_type_edit');
    const data = {
        modalWindow: modalWindowElement,
        form: modalWindowElement.querySelector('.popup__form'),
        fields: {
            name: modalWindowElement.querySelector('.popup__input_type_name'),
            description: modalWindowElement.querySelector('.popup__input_type_description'),
        },
        buttons: {
            close: modalWindowElement.querySelector('.popup__close'),
            submit: modalWindowElement.querySelector('.popup__button'),
        }
    }
    data.handlers = createHandlers(data, saveProfileClickHandler);

    return data;
}

function getModalNewCard() {
    const modalWindowElement = document.querySelector('.popup_type_new-card');
    const data = {
        modalWindow: modalWindowElement,
        form: modalWindowElement.querySelector('.popup__form'), fields: {
            placeName: modalWindowElement.querySelector('.popup__input_type_card-name'),
            link: modalWindowElement.querySelector('.popup__input_type_url'),
        }, buttons: {
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
        }, buttons: {
            close: modalWindowElement.querySelector('.popup__close'),
        }, handlers: createHandlers(modalWindowElement)
    }
    data.handlers = createHandlers(data);

    return data;
}

export function getModalAvatar() {
    const modalWindowElement = document.querySelector('.popup_type_avatar');

    const data = {
        modalWindow: modalWindowElement,
        form: modalWindowElement.querySelector('.popup__form'),
        fields: {
            link: modalWindowElement.querySelector('.popup__input_type_url'),
        },
        buttons: {
            close: modalWindowElement.querySelector('.popup__close'),
        }
    }
    data.handlers = createHandlers(data, saveAvatarClickHandler);

    return data;
}