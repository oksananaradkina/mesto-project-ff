// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// });
//
// clearValidation(profileForm, validationConfig);
const INPUT_VALIDATE_STATUSES = ['typeMismatch', 'tooShort', 'valueMissing', 'patternMismatch']

export function addValidationErrorMessage(container, status, message) {
    if (hasErrorMessageElement(container, status)) {
        return;
    }
    container.appendChild(createErrorMessageElement(status, message))
}

export function deleteValidationErrorMessage(container, status) {
    deleteErrorMessageElement(container, status)
}

export function deleteAllValidationErrorMessages(container) {
    container.innerHTML = '';
}

function createErrorMessageElement(status, message) {
    const element = document.createElement('div');
    element.classList.add('validation_error_message_item', 'validation_error_message_type_' + status);
    element.textContent = message;
    return element;
}

function deleteErrorMessageElement(container, status) {
    const element = container.querySelector('.validation_error_message_type_' + status);
    if (element) {
        element.remove();
    }
}

function hasErrorMessageElement(container, status) {
    return !!container.querySelector('.validation_error_message_type_' + status);
}

function getElementValidationStatuses(element) {
    return INPUT_VALIDATE_STATUSES.map((status) => {
        const attributeName = 'data-' + status;
        if (element.hasAttribute(attributeName)) {
            const message = element.getAttribute(attributeName)
            return {status, message}
        }

    }).filter(Boolean)

}

export function enableValidation(settings) {
    const {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    } = settings;
    const form = document.querySelector(formSelector);
    const inputs = form.querySelectorAll(inputSelector);
    const submit = form.querySelector(submitButtonSelector);
    inputs.forEach((element) => {

        element.addEventListener('input', (evt) => {
            const errorMessageContainer = form.querySelector('.popup__input_error_message__' + element.name);
            errorMessageContainer.classList.add(errorClass);

            if (element.validity.valid) {
                element.classList.remove(inputErrorClass)
                deleteAllValidationErrorMessages(errorMessageContainer);
                submit.classList.remove(inactiveButtonClass)
                return;
            }

            element.classList.add(inputErrorClass)
            submit.classList.add(inactiveButtonClass)
            const statuses = getElementValidationStatuses(element)

            statuses.forEach(({status, message}) => {
                if (element.validity[status]) {
                    addValidationErrorMessage(errorMessageContainer, status, message);
                } else {
                    deleteErrorMessageElement(errorMessageContainer, status)
                }

            })
        })
    });
}