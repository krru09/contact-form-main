import Submissions from "./Submissions.js";
import showToastNotification from "./toastNotification.js";
import {loadCurrentData, saveCurrentData, setSubmissionsData} from "./jsonData.js";
import {textErrors, selectErrors, removeTextErrors, removeSelectErrors} from "./errors.js";
import gatherData from "./data.js";

// array to hold form submission objects
export const formSubmissions = new Submissions();

// important form elements
export const formElements = document.querySelectorAll("input, textarea");

// textbox elements
const formElement = document.getElementById("contact-form");
const textInputElements = document.querySelectorAll('input[type="text"]');

// radio button elements and fieldset
const radioButtonFieldset = document.getElementById("query-type");
const radioButtonElements = document.querySelectorAll('input[type="radio"]')

// textarea element
const textAreaElement = document.querySelector("textarea");

// checkbox element and fieldset
const consentCheckbox = document.querySelector('input[type="checkbox"]');
const consentFieldset = document.querySelector(".consent-agreement");

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("currentFormData")) {
    loadCurrentData();
  }

  setSubmissionsData();
  saveCurrentData();

  // ERROR VALIDATION CHECKS
  textInputElements.forEach(textInput => {
    textInput.addEventListener("invalid", (event) => {
      event.preventDefault();
      textErrors(textInput);
    });
  })

  radioButtonElements.forEach(radioButton => {
    radioButton.addEventListener("invalid", (event) => {
      event.preventDefault();
      selectErrors(radioButtonFieldset);
    });
  });

  textAreaElement.addEventListener("invalid", (event) => {
    event.preventDefault();
    textErrors(textAreaElement);
  });

  consentCheckbox.addEventListener("invalid", (event) => {
    event.preventDefault();
    selectErrors(consentFieldset);
  });

  // FORM VALIDATION TO CLEAR ERROR
  textInputElements.forEach(textElement => {
    textElement.addEventListener("input", () => {
      if (textElement.checkValidity()) {
        removeTextErrors(textElement);
      }
    });
  })

  radioButtonElements.forEach(radioButton => {
    radioButton.addEventListener("change", (event) => {
      if (radioButton.checkValidity()) {
        removeSelectErrors(radioButtonFieldset);
      }
    });
  });

  textAreaElement.addEventListener("input", (event) => {
    if (textAreaElement.checkValidity()) {
      removeTextErrors(textAreaElement);
    }
  });

  consentCheckbox.addEventListener("change", (event) => {
    if (consentCheckbox.checkValidity()) {
      removeSelectErrors(consentFieldset);
    }
  });

  // submit form event listener
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("event triggered");
  
    let firstInvalidField = null;

    formElements.forEach(element => {
      if (!element.checkValidity()) {
        element.reportValidity();
        if (!firstInvalidField) {
          firstInvalidField = element;
        }
      }
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    if (formElement.reportValidity()) {
      setTimeout(() => {
        window.location.reload(); // Forces a clean reload
      }, 5001);
      console.log("the form is valid!");
      gatherData();
      showToastNotification();
      // remove current form data after the form is deemed valid
      localStorage.removeItem("currentFormData");
      formElement.reset();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth' // Optional for smooth scrolling
      });
      formElements[0].focus();
    }
  });
});