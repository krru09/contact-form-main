import FormObject from "./FormObject.js"; 

export default class Submissions {
  // private data field 
  #submissions

  constructor() {
    this.#submissions = [];
  }

  addSubmission(formObject) {
    if (formObject instanceof FormObject) {
      this.#submissions.push(formObject);
    }
  }

  getSubmissions() {
    /*
    1. Spread Operator (Shallow copy):
      Ever since ES6 dropped, this has been the most popular method. It’s a brief syntax and you’ll find it incredibly useful when using libraries like React and Redux.
    */
    return [...this.#submissions];
  }

  // save all history of form submissions into localStorage
  saveToStorage() {
    console.log("Inside saveToStorage()");
    console.log("Current Submissions: ", this.#submissions);

    // must manually extract data from each FormObject instead of using getSubmissions() directly due to JavaScript's behavior when handling objects with private fields (#privateField) in JSON.stringify

    // FormObject instances retain their private field, but JS's JSON.stringfy() ignores private properties (#firstName, #email, etc.) leaving you with empty objects

    // to properly store FormObject data in localStorage, you need to manually extract values with getter methods - this creates an array of plain obejcts, which can now be safely stored in localStorage vv
    const submissionsCopy = this.#submissions.map(formObject => ({
      firstName: formObject.firstName,
      lastName: formObject.lastName,
      emailAddress: formObject.emailAddress,
      queryType: formObject.queryType,
      message: formObject.message,
      consent: formObject.consent
    }));

    /*
      ^^ this does not break encapsulation because:
          1. You are only exposing a copy, not actual private fields
          2. Encapsulation is maintained since external code can't modify private data directly.
          3. You are still controlling access through getter methods.
    */

    localStorage.setItem("submissonsObject", JSON.stringify(submissionsCopy));
  }

  getFromStorage() {
    console.log("Inside getFromStorage()");
    return JSON.parse(localStorage.getItem("submissonsObject"));
  }
}