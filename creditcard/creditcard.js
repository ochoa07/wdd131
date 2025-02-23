// Reference form elements and card preview fields
const cardForm = document.getElementById('cardForm');
const cardNumber = document.getElementById('cardNumber');
const cardHolder = document.getElementById('cardHolder');
const expiryDate = document.getElementById('expiryDate');
const cvv = document.getElementById('cvv');
const cardLogo = document.getElementById('cardLogo');

// Update card details when the form is submitted
cardForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission

  // Get input values
  const inputNumber = document.getElementById('inputCardNumber').value.trim();
  const inputHolder = document.getElementById('inputCardHolder').value.trim();
  
  // Get expiration date from the select elements
  const inputExpiryMonth = document.getElementById('selectExpiryMonth').value;
  const inputExpiryYear = document.getElementById('selectExpiryYear').value;
  const inputExpiry = `${inputExpiryMonth}/${inputExpiryYear}`;

  const inputCVV = document.getElementById('inputCVV').value.trim();
  // You may not need this line unless you have a logo input field
  // const inputLogo = document.getElementById('inputLogo').value.trim();

  // Update card preview elements with entered data
  cardNumber.textContent = inputNumber || '1234 5678 9876 5432';
  cardHolder.textContent = inputHolder || 'John Doe';
  expiryDate.textContent = inputExpiry || 'MM/YY';
  cvv.textContent = inputCVV || '123';
  // Update logo if you have one, otherwise you can remove this line
  // cardLogo.textContent = inputLogo || 'YourBank';
});