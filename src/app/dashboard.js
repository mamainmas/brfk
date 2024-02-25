require("dotenv").config();
import { fetchDataFromRoute } from "../index";

document
   .querySelectorAll(".mr-deals")
   .forEach((x) => x.addEventListener("click", getMegaResaleStatus));

document
   .querySelectorAll(".add-vip")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll(".add-starter")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll(".add-basic")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll(".add-bronze")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll(".add-gold")
   .forEach((x) => x.addEventListener("click", openAmountModal));
document
   .querySelectorAll(".add-premium")
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
         document
            .querySelector("#megaResalesAvailableModal")
            .classList.contains("hidden")
            ? null
            : { isMegaResale: true }
      );

      console.log(response);
      window.location.href = "account-status.html";
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

const loaderContainer = document.getElementById("loaderContainer");

document.addEventListener("DOMContentLoaded", async () => {
   const accBal = document.querySelectorAll(".acc-bal");
   const affCap = document.querySelectorAll(".aff-cap");
   const affBal = document.querySelectorAll(".aff-bal");
   const affEq = document.querySelectorAll(".aff-eq");
   const totWdrw = document.querySelectorAll(".tot-wdrw");
   const megaRs = document.querySelectorAll(".mega-rs");
   const refBon = document.querySelectorAll(".ref-bonus");

   const { user } = await fetchDataFromRoute("users", "get", null, null);

   const { MRP } = await fetchDataFromRoute("mrp", "get", null, null);
   console.log(MRP);

   const {
      accountAffiliateCapital,
      accountTotalWithdrawal,
      accountBalance,
   } = user;

   const MRPBalance =
      MRP.length < 1
         ? 0
         : MRP.reduce(
              (accumulator, currentValue) =>
                 accumulator + currentValue.currentAmount,
              0
           );

   megaRs.forEach((bal) => (bal.textContent = MRPBalance.toFixed(2)));
   accBal.forEach((bal) => (bal.textContent = accountBalance.toFixed(2)));
   affBal.forEach(
      async (bal) =>
         (bal.textContent = Number(
            Number(await getAffiliateEquity()) + Number(MRPBalance)
         ).toFixed(2))
   );
   affEq.forEach(
      async (bal) =>
         (bal.textContent = Number(await getAffiliateEquity()).toFixed(2))
   );
   totWdrw.forEach(
      (bal) => (bal.textContent = accountTotalWithdrawal.toFixed(2))
   );
   affCap.forEach(
      (bal) => (bal.textContent = accountAffiliateCapital.toFixed(2))
   );
   //    console.log(response);
   loaderContainer.classList.add("hidden");
});

async function getAffiliateEquity() {
   try {
      const { plans } = await fetchDataFromRoute("plans", "get");
      loaderContainer.classList.remove("hidden");

      const generatedEquity = [];

      for (const planName in plans) {
         if (plans.hasOwnProperty(planName)) {
            const planData = plans[planName];

            if (Array.isArray(planData) && planData.length > 0) {
               console.log(`Making requests for plan: ${planName}`);

               const promises = planData.map(async (item) => {
                  console.log(`  Fetching data for ${planName}: ${item}`);
                  const res = await fetchDataFromRoute(
                     `plans/${item}`,
                     "get",
                     null,
                     { planType: planName }
                  );
                  return Math.floor(res.planDetails.currentAmount);
               });

               const results = await Promise.all(promises);

               generatedEquity.push(...results);
            }
         }
      }

      loaderContainer.classList.add("hidden");
      return generatedEquity.length > 0
         ? generatedEquity.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
           )
         : 0;
   } catch (error) {
      console.log(error);
   }
}

async function getMegaResaleStatus() {
   const response = await fetchDataFromRoute("users", "get", null, null);

   if (response.user.isMegaResalesAvailable == true) {
      document.querySelector("#trigger-mega-resales-btn").click();
   } else {
      document
         .querySelector("#trigger-mega-resales-available-btn")
         .click();
   }

   console.log(response.user.isMegaResalesAvailable);
}

module.exports = {
   getAffiliateEquity,
   // MRPBalance,
};
