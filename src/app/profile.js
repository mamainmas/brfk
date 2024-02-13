import { fetchDataFromRoute } from "../index";

const loaderContainer = document.getElementById("loaderContainer");

document.addEventListener("DOMContentLoaded", async () => {
   const fullName = document.querySelector("#fullName");
   const userID = document.querySelector("#userID");
   const email = document.querySelector("#email");
   const phoneNumber = document.querySelector("#phoneNumber");
   const country = document.querySelector("#country");
   const response = await fetchDataFromRoute("users", "get", null, null);
   console.log(response);

   fullName.value = response.user.fullName;
   userID.value = response.user.refID;
   email.value = response.user.accountEmail;
   phoneNumber.value = response.user.accountPhoneNumber;
   country.value = response.user.accountCountry;

   //    console.log(response);
   loaderContainer.classList.add("hidden");
});
