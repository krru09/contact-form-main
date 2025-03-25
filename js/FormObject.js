export default class FormObject {
  // private fields 
  #firstName;
  #lastName;
  #emailAddress;
  #queryType;
  #message;
  #consent;

  constructor({firstName, lastName, emailAddress, queryType, message, consent}) {
      this.#firstName = firstName;
      this.#lastName = lastName;
      this.#emailAddress = emailAddress;
      this.#queryType = queryType;
      this.#message = message;
      this.#consent = consent;
  }

  // Getters
  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get emailAddress() {
    return this.#emailAddress;
  }

  get queryType() {
    return this.#queryType;
  }

  get message() {
    return this.#message;
  }

  get consent() {
    return this.#consent
  }

  // Setters
  set firstName(firstName) {
    this.#firstName = firstName;
  }

  set lastName(lastName) {
    this.#lastName = lastName;
  }

  set emailAddress(emailAddress) {
    this.#emailAddress = emailAddress;
  }

  set queryType(queryType) {
    this.#queryType = queryType;
  }

  set message(message) {
    this.#message = message;
  }

  set consent(consent) {
    this.#consent = consent;
  }
}