import './pages/index.css';
import {showModal} from "./scripts/modal";
import {enableValidation} from "./scripts/validation";
import {loadInitialCards, loadProfile, requestError} from "./scripts/api";
import {buttonAddCard, MODAL_TYPES, MODAL_WINDOWS, PROFILE, setGlobalProfile} from "./scripts/constants";

import {addCards} from "./scripts/components/card";
import {initProfile, showProfile} from "./scripts/components/profile";


export function initAddCard() {
    buttonAddCard.addEventListener('click', addCardClickHandler);
}

function openModalAddCard() {
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.NEW_CARD]
    showModal(modalWindow);
}

export function addCardClickHandler(event) {
    openModalAddCard();
}

function createValidateConfig(formClass) {
    return {
        formSelector: `.${formClass} .popup__form`,
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button-inactive',
        inputErrorClass: 'popup__input-no-valid',
        errorClass: 'validation_error_message'
    }
}

initAddCard();
initProfile();


enableValidation(createValidateConfig('popup_type_new-card'));
enableValidation(createValidateConfig('popup_type_edit'));


loadProfile()
    .then((profile) => {
        setGlobalProfile(profile)
        showProfile(profile);
        loadInitialCards()
            .then((cards) => addCards(cards, PROFILE))
            .catch((error) => {
                requestError('Cards not loaded.', error);
            })
    })
    .catch((error) => {
        requestError('Profile not loaded.', error);
    })