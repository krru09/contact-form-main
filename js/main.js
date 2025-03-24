// array to hold form submission objects
const formSubmissions = [];

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

document.addEventListener("DOMContentLoaded", () => {
  // ERROR VALIDATION CHECKS
  textInputElements.forEach(textInput => {
    textInput.addEventListener("invalid", (event) => {
      event.preventDefault();
      textInput.nextElementSibling.classList.remove("hidden");
      textInput.classList.add("error-border");
    });
  })

  radioButtonElements.forEach(radioButton => {
    radioButton.addEventListener("invalid", (event) => {
      event.preventDefault();
      radioButtonFieldset.lastElementChild.classList.remove("hidden");
    });
  });

  textAreaElement.addEventListener("invalid", (event) => {
    event.preventDefault();
    textAreaElement.classList.add("error-border");
    textAreaElement.nextElementSibling.classList.remove("hidden");
  });

  consentCheckbox.addEventListener("invalid", (event) => {
    event.preventDefault();
    consentFieldset.lastElementChild.classList.remove("hidden");
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
      consentFieldset.lastElementChild.classList.add("hidden");;
    }
  });

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("event triggered");
    const formElements = document.querySelectorAll("input, textarea");
  
    formElements.forEach(element => {
      if (!element.checkValidity()) {
        element.reportValidity();
      }
    });
  
    let firstInvalidField = null;
    for (let i = 0; i < formElements.length; i++) {
      if (!formElements[i].checkValidity()) {
        firstInvalidField = formElements[i];
        break;
      }
    }
  
    if (firstInvalidField) {
      firstInvalidField.focus();
    }
  });
});