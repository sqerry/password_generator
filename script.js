const passwordGenerator = () =>{
    const resultEl = document.getElementById('result');
    const lengthEl = document.getElementById('length');
    const uppercaseEl = document.getElementById('uppercase');
    const lowercaseEl = document.getElementById('lowercase');
    const numbersEl = document.getElementById('numbers');
    const symbolsEl = document.getElementById('symbols');
    const generateEl = document.getElementById('generate');
    const clipboard = document.getElementById('clipboard');

    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    }

    clipboard.addEventListener('click', () => {
        const textarea = document.createElement('textarea');
        const password = resultEl.innerText;
        const checkmark = document.querySelector(".checkmark");

        if(password){
            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();

            if(checkmark){
                clipboard.classList.add("hide");
                checkmark.classList.add("checked");
            }
        }
    });

    generateEl.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll(".form-group input");

        if(checkboxes){
            const array = [];
            array.push(lowercaseEl, uppercaseEl, numbersEl, symbolsEl);
            let result = array.every(e  => !e.checked);

            if(result){
                for (const checkbox of checkboxes) {
                    checkbox.checked = true
                }
            }
        }

        let length = +lengthEl.value;
        const hasLower = lowercaseEl.checked;
        const hasUpper = uppercaseEl.checked;
        const hasNumber = numbersEl.checked;
        const hasSymbol = symbolsEl.checked;
        const checkmark = document.querySelector(".checkmark.checked");

        if(lengthEl.value < 4){
            length = 4;
        }
        if(clipboard.classList.contains("hide")){
            clipboard.classList.remove("hide");
        }
        if(checkmark){
            checkmark.classList.remove("checked")
        }
        if(resultEl){
            resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
        }
    });

    const generatePassword = (lower, upper, number, symbol, length) => {
        let generatedPassword = '';
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

        if(typesCount === 0) {
            return '';
        }

        for(let i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }

        return generatedPassword.slice(0, length);
    }

    function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getRandomNumber() {
        return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function getRandomSymbol() {
        const symbols = '!@#$%^&*(){}[]=<>/,.'
        return symbols[Math.floor(Math.random() * symbols.length)];


    }
}

passwordGenerator();