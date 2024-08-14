export function createHandlers(modalWindow, submitHandler = null) {
    return {
        overlay_click: overlayClickHandler(modalWindow),
        key_esc_down: keyEscDownHandler(modalWindow),
        close_button_click: closeButtonClickHandler(modalWindow),
        submit: submitHandler
    }
}

export function showModal(data) {
    const {handlers, modalWindow, buttons} = data;
    modalWindow.classList.add('popup_is-opened');

    modalWindow.addEventListener('click', handlers.overlay_click);
    document.addEventListener('keydown', handlers.key_esc_down);
    buttons.close.addEventListener('click', handlers.close_button_click);

    if (handlers.submit) {
        data.form.addEventListener('submit', handlers.submit)
    }
}

export function closeModal(data) {
    const {handlers, modalWindow, buttons} = data;

    modalWindow.classList.remove('popup_is-opened');

    modalWindow.removeEventListener('click', handlers.overlay_click);
    buttons.close.removeEventListener('click', handlers.close_button_click);
    document.removeEventListener('keydown', handlers.key_esc_down);

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
        if (event.keyCode === 27) {
            closeModal(modalWindow);
        }
    }
}

