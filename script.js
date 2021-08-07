const buttonsChange = document.getElementsByClassName('button-change');
const buttonsGet = document.getElementsByClassName('button-get');
const inputChange = document.querySelector('.input-change');
const inputGet = document.querySelector('.input-get');
const apidata = 'https://api.exchangerate.host/latest';

const currentChangeRate = document.querySelector('.current-change-rate');
const currentGetRate = document.querySelector('.current-get-rate');

async function getCurrency() {
    const response = await fetch(apidata);
    const result = await response.json();
    const rates = result.rates;
    for (let key in rates) {
        allRates[key] = rates[key];
    }
    const buttonsChangeActive = document.querySelector('.active-change');
    const buttonsGetActive = document.querySelector('.active-get');
    inputGet.value = (inputChange.value * allRates[buttonsGetActive.value] / allRates[buttonsChangeActive.value]).toFixed(4);
    goBaseRate();
}
getCurrency();

let allRates = {};

function goChange() {
    for(let i = 0; i < buttonsChange.length; i++) {
        buttonsChange[i].addEventListener('click', function(event) {
            const buttonsChangeActive = document.querySelector('.active-change');
            const buttonsGetActive = document.querySelector('.active-get');
            buttonsChangeActive.classList.remove('active-change');
            event.target.classList.toggle('active-change');
            inputGet.value = (inputChange.value * allRates[buttonsGetActive.value] / allRates[event.target.value]).toFixed(4);
            goBaseRate();
        })
    }
    inputChange.addEventListener('input', function() {
        const buttonsChangeActive = document.querySelector('.active-change');
        const buttonsGetActive = document.querySelector('.active-get');
        inputGet.value = (inputChange.value * allRates[buttonsGetActive.value] / allRates[buttonsChangeActive.value]).toFixed(4);
    })
}
goChange();

function goGet() {
    for(let j = 0; j < buttonsGet.length; j++) {
        buttonsGet[j].addEventListener('click', function(event) {
            const buttonsChangeActive = document.querySelector('.active-change');
            const buttonsGetActive = document.querySelector('.active-get');
            buttonsGetActive.classList.remove('active-get');
            event.target.classList.toggle('active-get');
            inputGet.value = (inputChange.value * allRates[event.target.value] / allRates[buttonsChangeActive.value]).toFixed(4);
            goBaseRate();
        })
    }
    inputGet.addEventListener('input', function() {
        const buttonsChangeActive = document.querySelector('.active-change');
        const buttonsGetActive = document.querySelector('.active-get');
        inputChange.value = (inputGet.value * allRates[buttonsChangeActive.value] / allRates[buttonsGetActive.value]).toFixed(4);
    })
}
goGet();

function goBaseRate() {    
    const buttonsChangeActive = document.querySelector('.active-change');
    const buttonsGetActive = document.querySelector('.active-get');
    currentChangeRate.textContent = `1 ${buttonsChangeActive.value} = ${(1 * allRates[buttonsGetActive.value] / allRates[buttonsChangeActive.value]).toFixed(4)} ${buttonsGetActive.value}`;
    currentGetRate.textContent = `1 ${buttonsGetActive.value} = ${(1 * allRates[buttonsChangeActive.value] / allRates[buttonsGetActive.value]).toFixed(4)} ${buttonsChangeActive.value}`;
}