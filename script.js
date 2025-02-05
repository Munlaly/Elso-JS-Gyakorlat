//Select elements
const transactions = document.querySelector('.transactions');
const balanceNumber = document.querySelector('.balance-number');
const income = document.querySelector('.number--income');
const expenses = document.querySelector('.number--expenses');
const form = document.querySelector('.form');
const inputDescription = document.querySelector('.input--description');
const inputAmount = document.querySelector('.input--amount');

function clickTransaction (event){
    //console.log('Mukszik');
    // remove transaction item visually
    const clickedElement = event.target.parentNode;
    
    //update income or expense
     //get the value from the item and convert it to a number
    const amount = Number(clickedElement.querySelector('.transaction__amount').textContent.trim() || 0);
    console.log(amount);

   
    if (amount > 0) {
     income.textContent=Number(income.textContent || 0) - amount;
    } 
    else if(amount < 0){
     //if ammount is 0 nothing is updated
      expenses.textContent=Number(expenses.textContent || 0) + amount;
    }
    //R
    // emove transaction
    clickedElement.remove();

    //update balance
    balanceNumber.textContent=Number(income.textContent || 0) - Number(expenses.textContent || 0)
 
    Number(balanceNumber.textContent || 0) < 0 ? balanceNumber.style.color = 'red' : balanceNumber.style.color = 'black'

    
}

//Add new transaction item based on the form
function submitForm (event) {
    //prevent default behavior
    event.preventDefault();
    //console.log('Mukszik');

    //get input values
    const description = inputDescription.value;
    const amount = Number(inputAmount.value || 0);
    //console.log(description, amount);

    //create new transaction item HTML
    const transactionItemHTML = `
        <li class="transaction  ${ amount > 0 ? 'transaction--income'  : 'transaction--expense'}">
            <span class="transaction__text">${description}</span>
            <span class="transaction__amount">${amount > 0 ? "+" : ""}${amount}</span>
            <button class="transaction__btn">X</button>
        </li>
    `;

    //insert new HTML
    transactions.insertAdjacentHTML('beforeend' , transactionItemHTML);

    //clear form input
    inputDescription.value = '';
    inputAmount.value = '';

    //unfocus (blur) form input
    inputDescription.blur();
    inputAmount.blur();

    //update income or expenses
    
    if(amount > 0) {
        income.textContent = Number(income.textContent || 0) + amount;
    }
    else if(amount < 0) {
        expenses.textContent = Number(expenses.textContent || 0) - amount;
    }

    //update balance
    balanceNumber.textContent=Number(income.textContent || 0) - Number(expenses.textContent || 0)
    Number(balanceNumber.textContent || 0) < 0 ? balanceNumber.style.color = 'red' : balanceNumber.style.color = 'black'

    
}

transactions.addEventListener('click',clickTransaction);

form.addEventListener('submit',submitForm);

