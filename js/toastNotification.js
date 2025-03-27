export default function showToastNotification() {
  console.log("hello");
  const notificationElement = document.querySelector(".notification-container");
  notificationElement.style.display = "grid";
  notificationElement.addEventListener("animationend", () => {
    notificationElement.style.display = "none";
  });
}