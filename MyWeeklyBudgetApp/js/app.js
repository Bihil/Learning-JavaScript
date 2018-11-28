// Classes
class Budget {
 constructor(budget) {
  this.budget = Number(budget);
  this.budgetLeft = this.budget;
 }
 // Substract form the budget
 substractFromBudget(amount) {
  return this.budgetLeft -= amount;
 }
}

// Everthing related to HTML
class HTML {
 // insert the budget when the user submit it
 insertBudget(amount) {
  // insert into HTML
  budgetTotal.innerHTML = `${amount}`;
  budgetLeft.innerHTML = `${amount}`;
 }
 // Displays a correct or invalid message
 printMessage(message, className) {
  const messagewrapper = document.createElement('div');
  messagewrapper.classList.add('text-center', 'alert', className);
  messagewrapper.appendChild(document.createTextNode(message));

  // inser into HTML
  document.querySelector('.primary').insertBefore(messagewrapper, addExpenseForm);

  // Clear the error
  setTimeout(function () {
   document.querySelector('.primary .alert').remove();
   addExpenseForm.reset();
  }, 3000);
 }
 // Display the expenses from the form into the list
 addExpenseToList(name, amount) {
  const expensesList = document.querySelector('#expenses ul');

  // Create a li
  const li = document.createElement('li');
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  // create the template
  li.innerHTML = `
   ${name}
   <span class="badge badge-primary badge-pill">$ ${amount}</span>
  `;
  // insert into the HTML
  expensesList.appendChild(li);
 }

 // Subtract expense amount from the budget
 trackBudget(amount) {
  const budgetLeftDollars = budget.substractFromBudget(amount);
  budgetLeft.innerHTML = `${budgetLeftDollars}`;

  // check when 25% is spent
  if ((budget.budget / 4) > budgetLeftDollars) {
   // add some classes and remove others
   budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
   budgetLeft.parentElement.parentElement.classList.add('alert-danger');

  } else if ((budget.budget / 2) > budgetLeftDollars) {
   budgetLeft.parentElement.parentElement.classList.remove('alert-success');
   budgetLeft.parentElement.parentElement.classList.add('alert-warning');
  }
 }
}

// Variables
const addExpenseForm = document.querySelector('#add-expense'),
 budgetTotal = document.querySelector('span#total'),
 budgetLeft = document.querySelector('span#left');

let budget, userBudget;

// Instantiate the HTML class
const html = new HTML();
// Event Listeners
eventListeners();

function eventListeners() {

 // App init
 document.addEventListener('DOMContentLoaded', function () {
  // Ask the visitor the weekly budget
  userBudget = prompt('What\'s your budget for this week?');
  // validate the user budget
  if (userBudget === null || userBudget === '' || userBudget === '0') {
   window.location.reload();
  } else {
   // Budget is vaild then instantiate the budget class
   budget = new Budget(userBudget);
   // Instanitate the HTML Class
   html.insertBudget(budget.budget);
  }
 });
 // When a new expense is added
 addExpenseForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // Read the values from the budget form 
  const expenseName = document.querySelector('#expense').value;
  const amount = document.querySelector('#amount').value;

  if (expenseName === '' || amount === '') {
   // console.log('invalid');
   html.printMessage('There was error, all the fields are mandatory',
    'alert-danger');
  } else {
   // add expenses to the list
   html.addExpenseToList(expenseName, amount);
   html.trackBudget(amount);
   html.printMessage('Added...',
    'alert-success');
  }
 });
}