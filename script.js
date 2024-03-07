// script.js
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // USD əsasında olan bir API
function populateCurrencies() {
    const currencySelects = document.querySelectorAll('select');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                currencySelects.forEach(select => select.appendChild(option.cloneNode(true)));
            });
        });
}

// Converter funksiyası
function convert() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];
            const result = (amount * exchangeRate).toFixed(2);

            resultElement.textContent = `Result: ${amount} ${fromCurrency} = ${result} ${toCurrency}`;
        });
}

// Valyuta seçimlərini təyin etdikdən sonra tətbiqin başında çağırın
populateCurrencies();
