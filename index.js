document.addEventListener("DOMContentLoaded", mainFunction());

function mainFunction() {

    /* Начало ввода входных данных */

    let blockId = '#rec453603415'; // введите id блока формы

    let startingPrice = 2000; // введите стартовую цену

    let photosInTheBasket = ''; // введите url фото для товара в корзине (оставьте пустым, если фото не нужно)

    let fieldNames = ['Капюшон', 'Цвет', 'Ремень']; // введите массив названий полей формы (кол-во должно быть равно кол-ву полей формы)

    let sizeChart = [8, 'https://ya.ru/']; // введите номер поля, в котором будет распологаться ссылка на размерную таблицу и ссылку на эту таблицу. ВАЖНО! текст ссылки разместите в подзаголовке поля. поддерживается только одна ссылка на форму

    let linkToThePageWithInformationAboutTheShoppingCart = 'https://kaambez-one.ru/the_product_has_been_added_to_the_cart'; // укажите ссылку на страницу, куда будет перенапрален пользователь после завершения формы

    let sharedArray = [ // введите массив добавленной стоимости вариантов ответа

        [0, 0, 0, 100],
        [0, 200],
        [0, 0, 300]

    ];

    /* Конец ввода входных данных */

    let tildaForm = document.querySelector(blockId);

    let numberOfFields = sharedArray.length;

    let arrayOfAddedPrices = [];

    let arrayOfAddedPricesMini = [];

    for (let i = 0; i < numberOfFields; i++) {

        arrayOfAddedPricesMini = nestedDeepCopy(arrayOfAddedPricesMini);

        arrayOfAddedPrices.push(arrayOfAddedPricesMini);

    };

    linkTheListenerToAllRadioButtons();

    updatingThePriceAtTheBottomOfTheForm(startingPrice);

    deactivatingTheSubmitButton();

    addingASizeTableReference();

    /* Начало списка функций */

    function addingASizeTableReference() {

        let inputSubtitle;

        setTimeout(function () {

            inputSubtitle = tildaForm.querySelector('[data-question-number="' + (sizeChart[0] - 1) + '"] .t-input-subtitle');

            console.log(inputSubtitle)

            inputSubtitle.innerHTML = '<a href="' + sizeChart[1] + '" target="_blank">' + inputSubtitle.innerHTML + '</a>';

        }, 5 * 1000)

    };

    function getTheNumberOfTheSelectedRadioButton() {

        let returnedArray = [];

        let returnedArrayOsn = [];

        let selectedItem = tildaForm.querySelector('.t-container .t-form__inputsbox .t-input-group-step_active input:checked');

        console.log(selectedItem);

        if (selectedItem) {

            let parentOfTheSelectedItem = selectedItem.closest('div.t-input-block');

            let labelAll = parentOfTheSelectedItem.querySelectorAll('label');

            for (let i = 0; i < labelAll.length; i++) {

                returnedArray = [];

                if (labelAll[i].querySelector('input:checked')) {

                    returnedArray.push(i);

                    returnedArray.push(labelAll[i].querySelector('input').value);

                    returnedArrayOsn.push(nestedDeepCopy(returnedArray));

                };

            };

            return returnedArrayOsn;

        } else {

            return returnedArrayOsn;

        };

    };

    function getTheNumberOfTheActiveField() {

        let returnedValue;

        returnedValue = +tildaForm.querySelector('.t-container .t-form__inputsbox .t-input-group-step_active').getAttribute('data-question-number');

        return returnedValue;

    };

    function updatingThePriceAtTheBottomOfTheForm(price) {

        let totalPriceBlock = '<div class="total_price_block"><p>Всего:</p> <p class="total_price_value">' + price + ' руб.</p></div>';

        totalPriceBlock = createElementFromHTML(totalPriceBlock);

        let container = tildaForm.querySelector('.t-container .t835__btn-wrapper');

        if (container.querySelector('.total_price_block')) {

            container.querySelector('.total_price_block').remove();

        };

        container.insertBefore(totalPriceBlock, container.firstChild);

    };

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstChild;
    };

    function updatingFormPriceData() {

        let radioButton = getTheNumberOfTheSelectedRadioButton();

        let numberOfTheActiveField = getTheNumberOfTheActiveField();

        arrayOfAddedPrices[numberOfTheActiveField] = [];

        for (let i = 0; i < radioButton.length; i++) {

            arrayOfAddedPrices[numberOfTheActiveField].push([sharedArray[numberOfTheActiveField][radioButton[i][0]], radioButton[i][1]]);

        };

        updatingThePriceAtTheBottomOfTheForm(calculatingTheFinalPrice());

    };

    function calculatingTheFinalPrice() {

        let totalCost = startingPrice;

        for (let i = 0; i < arrayOfAddedPrices.length; i++) {

            for (let m = 0; m < arrayOfAddedPrices[i].length; m++) {

                totalCost += arrayOfAddedPrices[i][m][0];

            };

        };

        return totalCost;

    };

    function nestedDeepCopy(array) {

        return JSON.parse(JSON.stringify(array));

    };

    function linkTheListenerToAllRadioButtons() {

        let radioButtonAll = document.querySelectorAll(blockId + ' .t-input-block label');

        for (radioButton of radioButtonAll) {

            radioButton.addEventListener("change", function () {

                updatingFormPriceData();

                overwritingTheFinalList();

                creatingALinkForTheShoppingCart();

            });

        };

    };

    function overwritingTheFinalList() {

        let finalList = tildaForm.querySelector('.t-form__inputsbox .t835__capture-form');

        let theFinalLine = '<h3>Итого:</h3><br>';

        for (let i = 0; i < arrayOfAddedPrices.length; i++) {

            for (let m = 0; m < arrayOfAddedPrices[i].length; m++) {

                theFinalLine += '<br>• ' + fieldNames[i] + ': ';

                theFinalLine += arrayOfAddedPrices[i][m][1];

            };

        };

        finalList.innerHTML = theFinalLine;

    };

    function creatingALinkForTheShoppingCart() {

        let linkElement = document.querySelector('.is-hidden-block a');

        let linkString = '#order:';

        for (let i = 0; i < arrayOfAddedPrices.length; i++) {

            for (let m = 0; m < arrayOfAddedPrices[i].length; m++) {

                if (i != 0 || m != 0) {

                    linkString += ', ';

                };

                linkString += fieldNames[i] + ': ';

                linkString += arrayOfAddedPrices[i][m][1];

            };

        };

        linkString += '=' + calculatingTheFinalPrice() + ':::image=' + photosInTheBasket;

        linkElement.href = linkString;

    };

    function deactivatingTheSubmitButton() {

        let submitButton = tildaForm.querySelector('.t-form__submit button.t-submit');

        submitButton.type = '';

        submitButton.addEventListener("click", function () {

            document.querySelector('.is-hidden-block a').click();

            window.location.replace(linkToThePageWithInformationAboutTheShoppingCart);

        })

    };

    /* Конец списка функций */

};