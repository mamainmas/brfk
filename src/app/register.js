import { fetchDataFromRoute } from "../index";
const urlParams = new URLSearchParams(window.location.search);

const regForm = document.querySelector("#reg-form");

document.addEventListener("DOMContentLoaded", (e) => {
   setTimeout(() => {
      document.getElementById("loaderContainer").classList.add("hidden");

      console.log(window.location.href);

      if (urlParams.has("ref")) {
         const refValue = urlParams.get("ref");
         document.querySelector("#referral").value = refValue;
      }

      regForm.addEventListener("submit", registerUser);
   }, 3000);
});

async function registerUser(e) {
   e.preventDefault();

   const formData = new FormData(e.target);

   const formDataObject = {};

   for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
   }

   try {
      const response = await fetchDataFromRoute(
         "register",
         "post",
         formDataObject,
         urlParams.has("ref") ? { ref: urlParams.get("ref") } : null
      );

      if (localStorage.getItem("uvtkn")) {
         localStorage.removeItem("uvtkn");
         localStorage.setItem("uvtkn", response.token);
      } else {
         localStorage.setItem("uvtkn", response.token);
      }

      setTimeout(() => {
         document
            .getElementById("loaderContainer")
            .classList.remove("hidden");

         window.location.href = "dashboard.html";
      }, 2200);
   } catch (error) {
      console.log("Error: ", error);
   }
}
