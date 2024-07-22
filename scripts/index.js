// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card, deleteCallback) {
    const template = document.querySelector('#card-template').content.cloneNode(true);

    const img = template.querySelector('.card__image');
    img.setAttribute('src', card.link);
    img.setAttribute('alt', card.name)

    const title = template.querySelector('.card__title')
    title.textContent = card.name;

    const buttonDelete = template.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', deleteCallback);
    return template;
}

// @todo: Функция удаления карточки
function cardDeleteHandler(event) {
    event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
function addCards() {
    const cardContainer = document.querySelector('.places__list');
    initialCards.forEach((card) => {
        const cardNode = createCard(card, cardDeleteHandler);
        cardContainer.append(cardNode);
    })
}

addCards();