require("dotenv").config();
import { fetchDataFromRoute } from "../index";

document
   .querySelectorAll("#add-starter")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll("#add-basic")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll("#add-bronze")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll("#add-gold")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll("#add-premium")
   .forEach((x) => x.addEventListener("click", openAmountModal));

const planType = document.querySelector("#selected-plan-type");
const planAmountModalTrigger = document.querySelector(
   "#trigger-modal-btn"
);
const addPlanBTN = document.querySelector("#add-plan");

let planTypeNotNull;

addPlanBTN.addEventListener("click", addPlan);

async function openAmountModal(e) {
   e.preventDefault();
   planType.innerHTML = String(e.target.dataset.planType)
      .split("-")
      .join(" ");
   console.log(e.target.dataset);
   planTypeNotNull = e.target.dataset.planType;

   planAmountModalTrigger.click();
}

async function addPlan(e) {
   e.preventDefault();

   console.log(planTypeNotNull.split("-").join(""));
   console.log(Number(document.querySelector("#user-amount").value));
   try {
      const response = await fetchDataFromRoute(
         "plans",
         "post",
         {
            userPlanType: String(planTypeNotNull.split("-").join("")),
            userAmount: Number(
               document.querySelector("#user-amount").value
            ),
         },
         null
      );

      console.log(response);
   } catch (error) {
      console.log(error);
      let errorMessage = error.message.replace("Error: ", "");
      document.querySelector("#modal-error-message").innerHTML =
         displayErrorMessage(errorMessage.trim());
   }
}

function displayErrorMessage(errorMsg) {
   let errorMessage;

   switch (errorMsg) {
      case "Amount must be more than zero":
         errorMessage = `
            Can't add $0 to purchase this plan
         `;
         break;
      case "Amount out of Range":
         errorMessage = `
            Purchase amount doesn't fall within the range of plan pricing
        `;
         break;

      case "Insufficient Balance to Invest":
         errorMessage = `
            Insufficient balance. Proceed to <a class='text-green-600' href='deposit.html'>Deposit</a>
        `;
         break;

      default:
         errorMessage = "An error occurred. Please try purchasing again.";
         break;
   }
   return errorMessage;
}
