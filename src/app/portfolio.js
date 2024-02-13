import { fetchDataFromRoute } from "../index";

const loaderContainer = document.getElementById("loaderContainer");

document.addEventListener("DOMContentLoaded", async () => {
   const accBal = document.querySelectorAll(".acc-bal");
   const affCap = document.querySelectorAll(".aff-cap");
   // const affBal = document.querySelectorAll(".aff-bal");
   const affEq = document.querySelectorAll(".aff-eq");
   const totWdrw = document.querySelectorAll(".tot-wdrw");
   const megaRs = document.querySelectorAll(".mega-rs");
   const refBon = document.querySelectorAll(".ref-bonus");

   const { user } = await fetchDataFromRoute("users", "get", null, null);

   const { MRP } = await fetchDataFromRoute("mrp", "get", null, null);

   const {
      accountAffiliateBalance,
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
   // affBal.forEach(
   //    (bal) => (bal.textContent = accountAffiliateBalance.toFixed(2))
   // );
  
   affEq.forEach(
      async (bal) =>
         (bal.textContent = Number(await getAffiliateEquity()).toFixed(2))
   );
   console.log(await getAffiliateEquity());
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

      let generatedEquity = [];

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
                  console.log(
                     Number(res.planDetails.currentAmount).toFixed(2)
                  );
                  return Math.floor(res.planDetails.currentAmount);
               });

               const results = await Promise.all(promises);

               generatedEquity.push(...results);
            }
         }
      }
      console.log(generatedEquity);

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
