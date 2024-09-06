import './pages/index.css';
import {showModal} from "./scripts/modal";
import {clearValidation, enableValidation} from "./scripts/validation";
import {loadInitialCards, loadProfile, requestError} from "./scripts/api";
import {buttonAddCard, MODAL_TYPES, MODAL_WINDOWS, PROFILE, setGlobalProfile} from "./scripts/constants";

import {addCards} from "./scripts/components/card";
import {initProfile, showProfile} from "./scripts/components/profile";


export function initAddCard() {
    buttonAddCard.addEventListener('click', addCardClickHandler);
}

function openModalAddCard() {
    const modalWindow = MODAL_WINDOWS[MODAL_TYPES.NEW_CARD]
    clearValidation(modalWindow.modalWindow)
    showModal(modalWindow);
}

export function addCardClickHandler(event) {
    openModalAddCard();
}

initAddCard();
initProfile();


enableValidation(MODAL_TYPES.EDIT);
enableValidation(MODAL_TYPES.NEW_CARD);


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