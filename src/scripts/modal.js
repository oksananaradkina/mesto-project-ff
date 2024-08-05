export function showModal(selector) {
    const modalWindow = document.querySelector(selector);
    modalWindow.classList.add('popup_is-opened');
    modalWindow.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown', keyEscDownHandler);

    const buttonClose = modalWindow.querySelector('.popup__close');
    buttonClose.addEventListener('click', buttonCloseClickHandler);

    return modalWindow;
}

function overlayClickHandler(event) {
    if(event.target.classList.contains('popup')){
        closeModal(event.target);
    }
}

function buttonCloseClickHandler(event) {
    const modalWindow = event.target.closest('.popup');
    closeModal(modalWindow);
}

function keyEscDownHandler(event) {
    if(event.keyCode === 27){
        const modalWindow = document.querySelector('.popup_is-opened');
        closeModal(modalWindow);
    }
}

export function closeModal(modalWindow) {
    modalWindow.removeEventListener('click', overlayClickHandler);
    const buttonClose = modalWindow.querySelector('.popup__close');
    buttonClose.removeEventListener('click', buttonCloseClickHandler);
    document.removeEventListener('keydown', keyEscDownHandler);

    modalWindow.classList.remove('popup_is-opened');
}