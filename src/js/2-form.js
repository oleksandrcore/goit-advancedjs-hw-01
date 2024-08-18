const STORAGE_KEY = 'feedback-form-state';
const formData = { email: "", message: "" };

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const saveFormDataToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFormDataFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    Object.assign(formData, JSON.parse(savedData));
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

const clearFormAndStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(formData).forEach(key => formData[key] = '');
  emailInput.value = '';
  messageTextarea.value = '';
};

const handleInputChange = (event) => {
  const { name, value } = event.target;
  if (formData.hasOwnProperty(name)) {
    formData[name] = value;
    saveFormDataToLocalStorage();
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  clearFormAndStorage();
};

document.addEventListener('DOMContentLoaded', loadFormDataFromLocalStorage);
form.addEventListener('input', handleInputChange);
form.addEventListener('submit', handleFormSubmit);
