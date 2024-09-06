export function createHandlers(modalWindow, submitHandler = null) {
    return {
        overlayClick: overlayClickHandler(modalWindow),
        keyEscDown: keyEscDownHandler(modalWindow),
        closeButtonClick: closeButtonClickHandler(modalWindow),
        submit: submitHandler
    }
}

export function showModal(data) {
    const {handlers, modalWindow, buttons} = data;
    modalWindow.classList.add('popup_is-opened');

    modalWindow.addEventListener('click', handlers.overlayClick);
    document.addEventListener('keydown', handlers.keyEscDown);
    buttons.close.addEventListener('click', handlers.closeButtonClick);

    if (handlers.submit) {
        data.form.addEventListener('submit', handlers.submit)
    }
}

export function closeModal(data) {
    const {handlers, modalWindow, buttons} = data;

    modalWindow.classList.remove('popup_is-opened');

    modalWindow.removeEventListener('click', handlers.overlayClick);
    buttons.close.removeEventListener('click', handlers.closeButtonClick);
    document.removeEventListener('keydown', handlers.keyEscDown);

    if (handlers.submit) {
        data.form.removeEventListener('submit', handlers.submit)
    }
}

function overlayClickHandler(windowData) {
    return (event) => {
        if (event.target === windowData.modalWindow) {
            closeModal(windowData)
        }
    }
}

function closeButtonClickHandler(modalWindow) {
    return () => closeModal(modalWindow)
}

function keyEscDownHandler(modalWindow) {
    return (event) => {
        if (event.code === "Escape") {
            closeModal(modalWindow);
        }
    }
}
