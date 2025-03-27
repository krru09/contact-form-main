import FormObject from "./FormObject.js";
import {formSubmissions} from "./main.js";

// gather data and place into objects after form validation
export default function gatherData() {
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