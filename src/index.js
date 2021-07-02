import './sass/main.scss';

import countriesCardTpl from './templates/country.hbs'
import itemsOfCountries from './templates/items-countries.hbs'
import API from './js/fetchCountries';
import getRefs from './js/get-refs';

// import { alert, notice, info, success, error } from '@pnotify/core';
import debounce from 'lodash.debounce';
const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const inputData = e.target;
    const searchValue = inputData.value;
    console.dir(searchValue);

    API.fetchCountries(searchValue)
        .then(renderCountries)
        .catch(onFetchError)
    .finally(()=>{form.reset()})
}


function renderCountries(country) {
    const cur=country[0]
    console.log(cur);
    const markup = countriesCardTpl(cur);
    refs.cardCont.innerHTML = markup;
}

function onFetchError(err) {
    // alert("Введите правильные данные - цифры")
    console.dir(err);
}

// const myError = onFetchError(err)({
//   text: "I'm an error message."
// });






