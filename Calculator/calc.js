document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let firstOperand = '';
    let secondOperand = '';
    let currentOperator = null;
    let shouldResetDisplay = false;

    
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => appendNumber(button.textContent));
    });

    
    document.querySelectorAll('.button').forEach(button => {
        if (!button.classList.contains('number')) {
            button.addEventListener('click', () => handleOperator(button.id));
        }
    });

    function appendNumber(number) {
        if (shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;
        }
        display.textContent = display.textContent === '0' ? number : display.textContent + number;
    }

    function handleOperator(operator) {
        switch (operator) {
            case 'clear':
                clear();
                break;
            case 'equals':
                evaluate();
                break;
            default:
                setOperator(operator);
        }
    }

    function clear() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        currentOperator = null;
        shouldResetDisplay = false;
    }

    function setOperator(operator) {
        if (currentOperator !== null) evaluate();
        firstOperand = display.textContent;
        currentOperator = operator;
        shouldResetDisplay = true;
        display.textContent += ` ${getOperatorSymbol(operator)} `;
    }

    function evaluate() {
        if (currentOperator === null || shouldResetDisplay) return;
        secondOperand = display.textContent.split(' ').pop();
        display.textContent = operate(currentOperator, firstOperand, secondOperand);
        currentOperator = null;
    }

    function operate(operator, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                return b === 0 ? 'Error' : a / b;
            default:
                return;
        }
    }

    function getOperatorSymbol(operator) {
        switch (operator) {
            case 'add':
                return '+';
            case 'subtract':
                return '-';
            case 'multiply':
                return '*';
            case 'divide':
                return '/';
            default:
                return '';
        }
    }
});
