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

function loadCurrentData() {
  const parsedFormData = JSON.parse(localStorage.getItem("currentFormData"));
  console.log(parsedFormData);

  Object.entries(parsedFormData).forEach(([key, value]) => {
    formElements.forEach(formElement => {
      if (formElement.name === key) {
        switch (formElement.type) {
          default:
            formElement.value = value;
            break;
          case "radio":
            const checkedRadio = document.querySelector(`input[type="radio"][value="${value}"]`);
            checkedRadio.checked = true;
            break;
          case "checkbox":
            formElement.checked = value;
            break;
        }
      }
    });
  });
}

function saveCurrentData() {
  let formData = {}
  if (localStorage.getItem("currentFormData")) {
    formData = JSON.parse(localStorage.getItem("currentFormData"));
  } else {
    formData = {};
  }

  formElements.forEach(formElement => {
    formElement.addEventListener("input", () => {
      if (formElement.matches("input[type='checkbox']")) {
        formData[formElement.getAttribute("name")] = formElement.checked;
      } else {
        formData[formElement.getAttribute("name")] = formElement.value;
      }
      localStorage.setItem("currentFormData", JSON.stringify(formData));
    });
  });
}

// load JSON form submissions data
function setSubmissionsData() {
  if (localStorage.getItem("submissonsObject")) {
    console.log("submissionsObject found in localStorage")
    const parsedData = JSON.parse(localStorage.getItem("submissonsObject"));
    parsedData.forEach(data => {
      const formObject = new FormObject(data);
      formSubmissions.addSubmission(formObject);
    });
    console.log(formSubmissions.getSubmissions());
  } else {
    console.log("no submissions in localStorage");
    console.log(formSubmissions.getSubmissions());
  }
}

// form functions
// show input errors
function textErrors(textElement) {
  textElement.nextElementSibling.classList.remove("hidden");
  textElement.classList.add("error-border");
}

function selectErrors(selectElement) {
  selectElement.lastElementChild.classList.remove("hidden");
}

// remove input errors
function removeTextErrors(textElement) {
  textElement.nextElementSibling.classList.add("hidden");
  textElement.classList.remove("error-border");
}

function removeSelectErrors(selectElement) {
  selectElement.lastElementChild.classList.add("hidden");
}

// gather data and place into objects after form validation
function gatherData() {
  const formData = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    emailAddress: document.getElementById("email").value,
    queryType: document.querySelector('input[name="inquiry-type"]:checked').value,
    message: document.getElementById("message").value,
    consent: document.getElementById("consent").checked
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

    To safely get the data, use getSubmissions() instead. vv

    console.log("getSubmissions() result from main: ", formSubmissions.getSubmissions());
  */

  console.log(formSubmissions.getFromStorage());
}

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
      console.log("the form is valid!");
      gatherData();
      // remove current form data after the form is deemed valid
      localStorage.removeItem("currentFormData");
    }
  });
});