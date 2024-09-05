(()=>{"use strict";function e(e){var t,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return{overlay_click:(t=e,function(e){e.target===t.modalWindow&&n(t)}),key_esc_down:o(e),close_button_click:r(e),submit:i}}function t(e){var t=e.handlers,n=e.modalWindow,r=e.buttons;n.classList.add("popup_is-opened"),n.addEventListener("click",t.overlay_click),document.addEventListener("keydown",t.key_esc_down),r.close.addEventListener("click",t.close_button_click),t.submit&&e.form.addEventListener("submit",t.submit)}function n(e){var t=e.handlers,n=e.modalWindow,r=e.buttons;n.classList.remove("popup_is-opened"),n.removeEventListener("click",t.overlay_click),r.close.removeEventListener("click",t.close_button_click),document.removeEventListener("keydown",t.key_esc_down),t.submit&&e.form.removeEventListener("submit",t.submit)}function r(e){return function(){return n(e)}}function o(e){return function(t){27===t.keyCode&&n(e)}}var i=["typeMismatch","tooShort","valueMissing","patternMismatch"];function c(e){var t=e.formSelector,n=e.inputSelector,r=e.submitButtonSelector,o=e.inactiveButtonClass,c=e.inputErrorClass,a=e.errorClass,u=document.querySelector(t),l=u.querySelectorAll(n),s=u.querySelector(r);l.forEach((function(e){e.addEventListener("input",(function(t){var n=u.querySelector(".popup__input_error_message__"+e.name);if(n.classList.add(a),e.validity.valid)return e.classList.remove(c),n.innerHTML="",void s.classList.remove(o);e.classList.add(c),s.classList.add(o);var r=function(e){return i.map((function(t){var n="data-"+t;if(e.hasAttribute(n))return{status:t,message:e.getAttribute(n)}})).filter(Boolean)}(e);r.forEach((function(t){var r=t.status,o=t.message;e.validity[r]?function(e,t,n){(function(e,t){return!!e.querySelector(".validation_error_message_type_"+t)})(e,t)||e.appendChild(function(e,t){var n=document.createElement("div");return n.classList.add("validation_error_message_item","validation_error_message_type_"+e),n.textContent=t,n}(t,n))}(n,r,o):function(e,t){var n=e.querySelector(".validation_error_message_type_"+t);n&&n.remove()}(n,r)}))}))}))}var a={baseUrl:"".concat("https://mesto.nomoreparties.co","/v1/").concat("wff-cohort-21"),headers:{authorization:"9c7c77e7-074c-48a7-957c-6b6c1ef95605","Content-Type":"application/json"}};function u(e,t,n){var r=[e],o={headers:a.headers,method:t};switch(t){case"GET":case"PUT":case"DELETE":r.push(n);break;case"POST":case"PATH":o.body=JSON.stringify(n)}return new Promise((function(e,t){fetch(function(e){return"".concat(a.baseUrl,"/").concat(e.join("/"))}(r),o).then((function(n){n.ok?e(n.json()):t(n)})).catch((function(e){return t(e)}))}))}var l=function(e){return u("cards","DELETE",e)},s=function(e){return u("cards/likes","PUT",e)},d=function(e){return u("cards/likes","DELETE",e)};function p(e,t){console.error("[REQUEST ERROR]",e,t)}function _(e){e.preventDefault();var t=T[C.AVATAR];(function(e){return u("users/me/avatar","PATCH",e)})(t.fields.link.value).then((function(e){w.fields.avatar.setAttribute("src",e.avatar),n(t)})).catch((function(e){p("Avatar not saved.",e)}))}function f(e){var n=e.target,r=n.getAttribute("src"),o=n.getAttribute("alt"),i=T[C.IMAGE];i.items.image.setAttribute("src",r),i.items.image.setAttribute("alt",o),i.items.caption.textContent=o,t(i)}function m(e){var t,r,o,i;e.preventDefault(),t=T[C.NEW_CARD],i=function(e,t){return{name:e.fields.placeName.value,link:e.fields.link.value,likes:[],owner:t}}(t,r=k),(o=i,u("cards","POST",o)).then((function(){var e=v(r,i,y,f,b);g.prepend(e.card),t.fields.placeName.value="",t.fields.link.value="",n(t)})).catch((function(e){p("Nev card not added.",e)}))}function v(e,t,n,r,o){var i=function(){var e=document.querySelector("#card-template").content.cloneNode(!0);return{card:e.querySelector(".card"),image:e.querySelector(".card__image"),title:e.querySelector(".card__title"),like_count:e.querySelector(".card__like-count"),buttons:{delete:e.querySelector(".card__delete-button"),like:e.querySelector(".card__like-button")}}}(),c=i.image;return c.setAttribute("src",t.link),c.setAttribute("alt",t.name),c.addEventListener("click",r),i.title.textContent=t.name,e._id!==t.owner._id?i.buttons.delete.remove():i.buttons.delete.addEventListener("click",n),i.buttons.like.addEventListener("click",o),i.like_count.textContent=t.likes.length,i.card.setAttribute("data-id",t._id),i}function y(e){var t=e.target.closest(".card"),n=t.getAttribute("data-id");l(n).then((function(){t.remove()})).catch((function(e){p("Card not deleted.",e)}))}function b(e){var t=e.target,n=e.target.closest(".card"),r=n.getAttribute("data-id"),o="card__like-button_is-active",i=n.querySelector(".card__like-count");t.classList.contains(o)?d(r).then((function(e){t.classList.remove(o),i.textContent=e.likes.length})).catch((function(e){p("Like not deleted.",e)})):s(r).then((function(e){t.classList.add(o),i.textContent=e.likes.length})).catch((function(e){p("Like not added.",e)}))}function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function h(e,t,n){return(t=function(e){var t=function(e){if("object"!=S(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=S(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==S(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k,E,q,A,g=document.querySelector(".places__list"),L=document.querySelector(".profile__add-button"),C={EDIT:"edit",NEW_CARD:"new_card",IMAGE:"image",AVATAR:"avatar"},T=h(h(h(h({},C.EDIT,((q={modalWindow:E=document.querySelector(".popup_type_edit"),form:E.querySelector(".popup__form"),fields:{name:E.querySelector(".popup__input_type_name"),description:E.querySelector(".popup__input_type_description")},buttons:{close:E.querySelector(".popup__close"),submit:E.querySelector(".popup__button")}}).handlers=e(q,(function(e){e.preventDefault();var t,r=T[C.EDIT],o=r.fields.name.value,i=r.fields.description.value;r.buttons.submit.textContent="Сохранить...",(t={name:o,description:i},u("users/me","PATCH",t)).then((function(){!function(e,t){w.fields.name.textContent=e,w.fields.description.textContent=t}(o,i),r.buttons.submit.textContent="Сохранить",n(r)})).catch((function(e){p("Profile not updated.",e)}))})),q)),C.NEW_CARD,function(){var t=document.querySelector(".popup_type_new-card"),n={modalWindow:t,form:t.querySelector(".popup__form"),fields:{placeName:t.querySelector(".popup__input_type_card-name"),link:t.querySelector(".popup__input_type_url")},buttons:{close:t.querySelector(".popup__close")}};return n.handlers=e(n,m),n}()),C.IMAGE,function(){var t=document.querySelector(".popup_type_image"),n={modalWindow:t,items:{image:t.querySelector(".popup__image"),caption:t.querySelector(".popup__caption")},buttons:{close:t.querySelector(".popup__close")},handlers:e(t)};return n.handlers=e(n),n}()),C.AVATAR,function(){var t=document.querySelector(".popup_type_avatar"),n={modalWindow:t,form:t.querySelector(".popup__form"),fields:{link:t.querySelector(".popup__input_type_url")},buttons:{close:t.querySelector(".popup__close")}};return n.handlers=e(n,_),n}()),w={fields:{avatar:(A=document.querySelector(".profile")).querySelector(".profile__avatar"),avatar_edit:A.querySelector(".profile__avatar_icon_edit"),name:A.querySelector(".profile__title"),description:A.querySelector(".profile__description")}};function x(e){return{formSelector:".".concat(e," .popup__form"),inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input-no-valid",errorClass:"validation_error_message"}}L.addEventListener("click",(function(e){t(T[C.NEW_CARD])})),document.querySelector(".profile__edit-button").addEventListener("click",(function(e){var n,r,o;n=w.fields.name.textContent,r=w.fields.description.textContent,(o=T[C.EDIT]).fields.name.value=n,o.fields.description.value=r,t(o)})),w.fields.avatar_edit.addEventListener("click",(function(e){var n=T[C.AVATAR];n.fields.link.vablue=w.fields.avatar.getAttribute("src"),t(n)})),c(x("popup_type_new-card")),c(x("popup_type_edit")),u("users/me","GET").then((function(e){!function(e){k=e}(e),function(e){w.fields.avatar.setAttribute("src",e.avatar),w.fields.name.textContent=e.name,w.fields.description.textContent=e.about}(e),u("cards").then((function(e){return function(e,t){e.forEach((function(e){var n=v(t,e,y,f,b);g.append(n.card)}))}(e,k)})).catch((function(e){p("Cards not loaded.",e)}))})).catch((function(e){p("Profile not loaded.",e)}))})();