// Method using the constructor type or 'blueprint'

// Declare the constructor which will hold data
function Calculator (previousOperandElement, currentOperandElement, element) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.calculationBoolean = false;
    this.allClear();
    this.listElement = element;        
    this.textList = ['Calculation History:'];  
}
// Set the properties for prototype of Calculator object
// Equal to setting instance methods within a class. Note different syntax

Calculator.prototype = {
    createListItem: function(text) {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
    },

    recallHistory: function() {
        let calculationHistory = document.querySelector('.calculation-history');
        calculationHistory.classList.toggle('history-active');
        if(calculationHistory.style.display === 'block') {
            calculationHistory.style.display = 'none';
        } else {
            calculationHistory.style.display = 'block';
        }
    },

    updateList: function() {
        while (this.listElement.firstChild) {
            this.listElement.removeChild(this.listElement.firstChild);
        }
        for(const text of this.textList) {
            this.listElement.appendChild(this.createListItem(text));
        }
    },

    clearList: function() {
        this.textList = ['Calculation History:'];
    },

    addListItem: function(calculatedValue) {
        this.textList.push(`${this.previousOperand} ${this.operation} ${this.currentOperand} = ${calculatedValue}`)
    },




    allClear: function() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    },

    clearEntry: function() {
        this.currentOperand = '0';
    },

    delete: function() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    },

    reverseSign: function() {
        this.currentOperand = this.currentOperand * -1;
    },

    appendNumber: function(number) {
        if(this.calculationBoolean === true && number === '.') {
            this.currentOperand = '0' + number.toString();
            this.calculationBoolean = false;
            return
        }
        if(this.calculationBoolean === true) {
            this.currentOperand = number.toString();
            this.calculationBoolean = false;
            return
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (number === '0' && this.currentOperand === '0') return;
        if (this.currentOperand.length > 14) return;

        if (number === '.' && this.currentOperand === '') {
            this.currentOperand = '0' + number.toString();
            return           
        }
        if (number === '.') {
            this.currentOperand = this.currentOperand.toString() + number.toString();
            return           
        }
        if (this.currentOperand !== '0') {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        if (this.currentOperand === '0' && this.currentOperand.length === 1) {
            this.currentOperand = number.toString();
        }
    },

    chooseOperation: function(operation) {
        if( this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''; 
    },

    compute: function() {
        let calculatedValue
        const prev = parseFloat(this.previousOperand);        
        const current = parseFloat(this.currentOperand);        

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '%':
                calculatedValue = (prev*10 % current*10) / 10
                break
            case '÷':
                calculatedValue = prev / current
                break
            case 'x':
                calculatedValue = (prev*10 * current*10) / 100
                break
            case '-':
                calculatedValue = (prev*10 - current*10) / 10
                break
            case '+':
                calculatedValue = (prev*10 + current*10) / 10
                break
            default: return                
        }
        this.addListItem(calculatedValue);
        this.updateList();
        this.currentOperand = calculatedValue;
        this.previousOperand = '';
        this.operation = undefined;
        this.calculationBoolean = true;
    },
    
    updateDisplay: function() {
        this.currentOperandElement.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        if (this.operation == null) {
            this.previousOperandElement.innerText = '';
        }
    }

}

const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearEntryButton = document.querySelector('[data-clear-entry]')
const allClearButton = document.querySelector('[data-all-clear]')
const signButton = document.querySelector('[data-sign]')

const recallHistoryButton = document.querySelector('[data-history-recall]')
// const memorySaveButton = document.querySelector('[data-memory-save]')
const clearHistoryButton = document.querySelector('[data-history-clear]')
const myList = document.querySelector('[data-history-list]')

const calculator = new Calculator(previousOperandElement, currentOperandElement, myList);


numberButtons.forEach( button => {
    button.addEventListener('click', function () {
        calculator.appendNumber(button.value);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', function() {
        calculator.chooseOperation(operation.value);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', function() {
    calculator.compute()
    calculator.updateDisplay()
});

allClearButton.addEventListener('click', function() {
    calculator.allClear();
    calculator.updateDisplay();
});

clearEntryButton.addEventListener('click', function() {
    calculator.clearEntry();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', function() {
    calculator.delete();
    calculator.updateDisplay();
})

signButton.addEventListener('click', function() {
    calculator.reverseSign();
    calculator.updateDisplay();
})

recallHistoryButton.addEventListener('click', function() {
    calculator.recallHistory();
    this.classList.toggle('recall-active-js');
})

clearHistoryButton.addEventListener('click', function() {
    calculator.clearList();
    calculator.updateList();
})
