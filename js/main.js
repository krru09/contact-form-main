import FormObject from "./FormObject.js";
import Submissions from "./Submissions.js";

// array to hold form submission objects
const formSubmissions = new Submissions();

// all form elements
const formElements = document.querySelectorAll("input, textarea");

// important form elements
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

// form functions
function textErrors(textElement) {
    textElement.nextElementSibling.classList.remove("hidden");
    textElement.classList.add("error-border");
}

function selectErrors(selectElement) {
  selectElement.lastElementChild.classList.remove("hidden");
}

function gatherData() {
  const formData = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    emailAddress: document.getElementById("email").value,
    queryType: document.querySelector('input[name="inquiry-type"]:checked').value,
    message: document.getElementById("message").value,
    consent: document.getElementById("consent").value
  };

  /*
    1. Object destruction extracts values from objects in a clean, readable way. 
    2. Property names must match exactly when destructuring. 
    3. If the name doesn't match, the value will be undefined 
    4. You can set default values and rename properties when destructuring.
  */

  const formObject = new FormObject(formData);
  formSubmissions.addSubmission(formObject);
  formSubmissions.saveToStorage();
  /*
    console.log(formSubmissions)
    ^^
    Edge DevTools shows private fields under "Private fields" when expanded but they are still inaccessible in code. Trying to access #submissions directly throws an error.

    To safely get the data, use getSubmissions() instead.
  */
  console.log("getSubmissions() result from main: ", formSubmissions.getSubmissions());
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
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
        textElement.nextElementSibling.classList.add("hidden");
        textElement.classList.remove("error-border");
      }
    });
  })

  radioButtonElements.forEach(radioButton => {
    radioButton.addEventListener("change", (event) => {
      if (radioButton.checkValidity()) {
        radioButtonFieldset.lastElementChild.classList.add("hidden");
      }
    });
  });

  textAreaElement.addEventListener("input", (event) => {
    if (textAreaElement.checkValidity()) {
      textAreaElement.classList.remove("error-border");
      textAreaElement.nextElementSibling.classList.add("hidden");
    }
  });

  consentCheckbox.addEventListener("change", (event) => {
    if (consentCheckbox.checkValidity()) {
      consentFieldset.lastElementChild.classList.add("hidden");
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
      console.log("the form is valid!");
      gatherData();
    }
  });
});