require("dotenv").config();

async function verifyToken(token) {
   try {
      const response = await fetch(
         `${process.env.SERVER_URL}/verify-user`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
         }
      );
      const data = await response.json();
      if (response.ok) {
         console.log(data.message); // Token is valid
         return true;
      } else {
         console.error(data.message); // Token is invalid
         return false;
      }
   } catch (error) {
      console.error("Error verifying token:", error);
      return false;
   }
}

document.addEventListener("DOMContentLoaded", async function () {
   const loaderContainer = document.getElementById("loaderContainer");
   loaderContainer.classList.remove("hidden");

   const storedToken = localStorage.getItem("uvtkn");

   if (storedToken) {
      try {
         const isValid = await verifyToken(storedToken);
         if (isValid) {
            loaderContainer.classList.add("hidden");
         } else {
            window.location.href = "login.html";
         }
      } catch (error) {
         console.error("Error verifying token:", error);
      }
   } else {
      window.location.href = "login.html";
   }
});
