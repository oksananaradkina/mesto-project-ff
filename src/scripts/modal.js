export const modalTypes = {
    EDIT: 'edit',
    NEW_CARD: 'new_card',
    IMAGE: 'image'
}

function getModalEdit() {
    const modalWindow = document.querySelector('.popup_type_edit');
    return {
        window: modalWindow,
        form: modalWindow.querySelector('.popup__form'),

        fields: {
            name: modalWindow.querySelector('.popup__input_type_name'),
            description: modalWindow.querySelector('.popup__input_type_description')
        },
        buttons: {
            close: modalWindow.querySelector('.popup__close'),
        }
    }
}

function getModalNewCard() {
    const modalWindow = document.querySelector('.popup_type_new-card');
    return {
        window: modalWindow,
        form: modalWindow.querySelector('.popup__form'),
        fields: {
            place_name: modalWindow.querySelector('.popup__input_type_card-name'),
            link: modalWindow.querySelector('.popup__input_type_url')
        },
        buttons: {
            close: modalWindow.querySelector('.popup__close'),
        }
    }

}

function getModalImage() {
    const modalWindow = document.querySelector('.popup_type_image');
    return {
        window: modalWindow,
        items: {
            image: modalWindow.querySelector('.popup__image'),
            caption: modalWindow.querySelector('.popup__caption')
        },
        buttons: {
            close: modalWindow.querySelector('.popup__close'),
        }
    }
}

export const modalWindows = {
    [modalTypes.EDIT]: getModalEdit(),
    [modalTypes.NEW_CARD]: getModalNewCard(),
    [modalTypes.IMAGE]: getModalImage()
}

export function getModal(modalType) {
    return modalWindows[modalType]
}

export function showModal(modalWindow) {
    modalWindow.window.classList.add('popup_is-opened');
    modalWindow.window.addEventListener('click', overlayClickHandler(modalWindow));
    document.addEventListener('keydown', keyEscDownHandler(modalWindow));

    modalWindow.buttons.close.addEventListener('click', buttonCloseClickHandler(modalWindow));
}

function overlayClickHandler(modalWindow) {
    return (event) => {
        if (event.target === modalWindow.window) {
            closeModal(modalWindow)
        }
    }
}

function buttonCloseClickHandler(modalWindow) {
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
    modalWindow.buttons.close.removeEventListener('click', buttonCloseClickHandler);
    document.removeEventListener('keydown', keyEscDownHandler(modalWindow.window));

    modalWindow.window.classList.remove('popup_is-opened');
}