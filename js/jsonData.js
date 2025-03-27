// loads current incomplete submission data if applicable
import FormObject from "./FormObject.js";
import {formSubmissions} from "./main.js";
import {formElements} from "./main.js"

export function loadCurrentData() {
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

// saves input data from current (but incomplete) form submission
export function saveCurrentData() {
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
export function setSubmissionsData() {
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