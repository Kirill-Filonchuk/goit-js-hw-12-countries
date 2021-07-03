import './sass/main.scss';

import { alert, defaultModules, notice,  error, success} from '../node_modules/@pnotify/core/dist/PNotify.js';
  import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

 alert({
      text: 'Введи название страны',
         type: 'alert',
         delay: 2500,
      });


import countriesCardTpl from './templates/country.hbs'
import itemsOfCountries from './templates/items-countries.hbs'
import API from './js/fetchCountries';
import getRefs from './js/get-refs';

import debounce from 'lodash.debounce';
const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

function onSearch(e) {
    e.preventDefault();
    const inputData = e.target;
    const searchValue = inputData.value;
    console.dir(searchValue);

    API.fetchCountries(searchValue)
        .then(renderCountries)
        .catch(onFetchError)
    .finally(()=>{e.target.value=''})
}


function renderCountries(country) {
 
const list =[]
    for (let i = 0; i < country.length; i++){
list.push(country[i].name)
    }

    if (country.length === 1) {
        
notice({
    text: 'Запрос успешно обработан',
    type: 'notice',
  delay: 1500,
       animation: 'slide',
});

         const markup = countriesCardTpl(...country);
    refs.cardCont.innerHTML = markup;
    }
    if (country.length >= 2 && country.length <= 10) {
           
       success({
      text: 'Список стран по Вышему запросу',
           type: 'success',
       delay: 1500,
});

        const markup = itemsOfCountries(country);
         console.log(country);
    refs.inputList.innerHTML = markup;
    }
    if (country.length >10) {
       refs.cardCont.innerHTML = '' 
  error({
    text: "Введите более специфичный запрос. ",
      type: 'error',
     delay: 1500,
});

    }
      console.log(list);
    console.log(country.length);
     
}

function onFetchError(err) {

     alert({
      text: 'Введи название страны',
         type: 'alert',
         delay: 1500,
      });

    console.dir(err);
}

console.log(refs.inputList);





