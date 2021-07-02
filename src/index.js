import './sass/main.scss';

import countriesCardTpl from './templates/country.hbs'
import itemsOfCountries from './templates/items-countries.hbs'
import API from './js/fetchCountries';
import getRefs from './js/get-refs';

// const debounce = require("../node_modules/lodash.debounce")
// debounce
// Import debounce
import debounce from 'lodash.debounce';
const refs = getRefs();

refs.searchForm.addEventListener('submit', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const searchValue = form.elements.query.value;
    console.log(searchValue);

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
    alert("Введите правильные данные - цифры")
    console.dir(err);
}







