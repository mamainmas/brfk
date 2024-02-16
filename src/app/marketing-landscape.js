import { fetchDataFromRoute } from "../index";

document.addEventListener("DOMContentLoaded", async () => {
   try {
      const response = await fetchDataFromRoute(
         "users",
         "get",
         null,
         null
      );

      console.log(response);
      if (response.user.accountNiche != "") {
         document.querySelectorAll(".niche-icon").forEach((icon) => {
            if (
               icon.getAttribute("data-plan-type") ==
               response.user.accountNiche
            ) {
               // icon.style.display = "none";
               icon.classList.add("hidden");

               const siblingicon = icon.nextElementSibling;
               if (
                  siblingicon &&
                  siblingicon
                     .getAttribute("data-plan-type")
                     .includes(`${response.user.accountNiche}-cancel`)
               ) {
                  siblingicon.classList.remove("hidden");
                  // siblingicon.classList.remove(`niche-icon`);

                  siblingicon.addEventListener("click", async (e) => {
                     e.preventDefault();
                     const pTYPE = e.target.dataset.planType;

                     const response = await fetchDataFromRoute(
                        "users",
                        "patch",
                        {
                           accountNiche: pTYPE
                              .split("-")
                              .includes("cancel")
                              ? "cancel"
                              : null,
                        },
                        null
                     );
                     console.log(response);
                     window.location.reload();
                  });
               }
            }
         });
      }

      if (response.user.accountSmartLink == "Pending") {
         const classADV =
            document.querySelector(".advert-fee-req").className;
         const parEL =
            document.querySelector(".advert-fee-req").parentElement;

         document.querySelector(".advert-fee-req").remove();

         const slaBTN = document.createElement("button");
         slaBTN.className = classADV
            .split(" ")
            .filter((e) => e != "advert-fee-req")
            .join(" ");

         slaBTN.classList.add("advert-fee-pending");
         slaBTN.textContent = `
                  Pending | Cancel
            `;
         parEL.appendChild(slaBTN);

         slaBTN.addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await fetchDataFromRoute(
               "users",
               "patch",
               { accountSmartLink: "Inactive" },
               null
            );

            window.location.reload();
         });
      }

      if (
         response.user.accountSmartLinkAmount >= 0 &&
         response.user.accountSmartLink == "Pending"
      ) {
         const classADV =
            document.querySelector(".advert-fee-req").className;
         const parEL =
            document.querySelector(".advert-fee-req").parentElement;
         document.querySelector(".advert-fee-req").remove();
         const slaBTN = document.createElement("a");
         slaBTN.className = classADV
            .split(" ")
            .filter((e) => e != "advert-fee-req")
            .join(" ");
         slaBTN.classList.add("advert-fee-payment");
         slaBTN.setAttribute("href", "deposit.html");
         slaBTN.textContent = `
               Smartlink: $${response.user.accountSmartLinkAmount} | Make Payment
         `;
         parEL.appendChild(slaBTN);
      }

      console.log(response.user.accountNiche);
   } catch (error) {}
});

document.querySelectorAll(".niche-icon").forEach((icon) => {
   icon.addEventListener("click", validateSelectedNiche);
});

async function validateSelectedNiche(e) {
   e.preventDefault();
   console.log(e.target.dataset.planType);

   const response = await fetchDataFromRoute(
      "users",
      "patch",
      { accountNiche: e.target.dataset.planType },
      null
   );

   console.log(response);
   window.location.reload();
}

document
   .querySelector(".advert-fee-req")
   .addEventListener("click", async (e) => {
      e.preventDefault();
      const response = await fetchDataFromRoute(
         "users",
         "patch",
         {
            accountSmartLink: "Pending",
         },
         null
      );

      console.log(response);
      window.location.reload();
   });
