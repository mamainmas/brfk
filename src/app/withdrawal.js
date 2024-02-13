import { fetchDataFromRoute } from "../index";

// const loaderContainer = document.getElementById("loaderContainer");

const transactionStatusButton = document.querySelector(
   "#transactionStatusButton"
);
const txMethod = document.querySelector("#txMethod");
const txAmount = document.querySelector("#txAmount");

document
   .querySelector("#withdrawal-form")
   .addEventListener("click", placeWithdrawalRequest);

async function placeWithdrawalRequest(e) {
   e.preventDefault();

   const bodyData = {
      txMethod: txMethod.value,
      txAmount: txAmount.value,
   };

   try {
      const response = await fetchDataFromRoute(
         "transactions",
         "post",
         bodyData,
         {
            userTransactionType: "Withdrawal",
         }
      );

      console.log(response)
   } catch (error) {
      console.log(error);
   }
}
