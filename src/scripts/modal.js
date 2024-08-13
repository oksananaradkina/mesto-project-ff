export function showModal(modalWindow) {
    modalWindow.window.classList.add('popup_is-opened');
    modalWindow.window.addEventListener('click', overlayClickHandler(modalWindow));
    document.addEventListener('keydown', keyEscDownHandler(modalWindow));

    modalWindow.buttons.close.addEventListener('click', closeButtonClickHandler(modalWindow));
}

function overlayClickHandler(modalWindow) {
    return (event) => {
        if (event.target === modalWindow.window) {
            closeModal(modalWindow)
        }
    }
}

function closeButtonClickHandler(modalWindow) {
    return () => closeModal(modalWindow)
}

function keyEscDownHandler(modalWindow) {
    const _modalWindow = modalWindow;
    return (event) => {
        if (event.keyCode === 27) {
            closeModal(_modalWindow);
        }
    }
}

export function closeModal(modalWindow) {
    modalWindow.window.removeEventListener('click', overlayClickHandler);
    modalWindow.buttons.close.removeEventListener('click', closeButtonClickHandler);
    document.removeEventListener('keydown', keyEscDownHandler(modalWindow.window));

    modalWindow.window.classList.remove('popup_is-opened');
}