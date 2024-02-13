import { fetchDataFromRoute } from "../index";
import * as ADDRESSES from "../../addresses.json";

const proceedBTN = document.getElementById("proceed-btn");
const requestConfirmationBTN = document.getElementById(
   "payment-confirmation-btn"
);

proceedBTN.addEventListener("click", verifyPaymentInfo);

function verifyPaymentInfo(e) {
   e.preventDefault();

   const paymentMethod = document.getElementById("txMethod");
   const amount = parseFloat(document.getElementById("txAmount").value);

   if (isNaN(amount) || amount < 100) {
      console.log("Please enter a valid amount of at least 100");
      return;
   }

   if (!paymentMethod[paymentMethod.value]) {
      console.log("Select Payment method");
      return;
   }

   showPaymentDetails(paymentMethod[paymentMethod.value].textContent);

   console.log(
      "Form is valid. Payment method:",
      paymentMethod[paymentMethod.value].textContent,
      "Amount:",
      amount
   );
}

function showPaymentDetails(pM) {
   document.getElementById("txMethod").setAttribute("disabled", true);
   document.getElementById("txAmount").setAttribute("disabled", true);
   document
      .getElementById("txAmount")
      .classList.add("bg-white", "text-gray-900", "opacity-80");

   proceedBTN.classList.add("hidden");

   const pAdd = `${String(pM).toUpperCase()}_ADDRESS`;
   console.log(ADDRESSES[pAdd]);
   const form = document.getElementById("deposit-form");
   const paymentDiv = document.createElement("div");
   paymentDiv.className =
      "block w-full rounded-lg space-y-2 bg-darkbg1 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700";
   const paymentInfoDOM = `
      <div class="mb-4 space-y-2">
         <h4 class="text-lg font-medium text-white">
            ${pM} Payment
         </h4>
         <hr />
         <ul class="pl-4 space-y-1 text-white">
            <li>Copy payment information.</li>
            <li>Make payment</li>
            <li>Upload proof of payment</li>
            <li>Request payment Confirmation</li>
         </ul>
      </div>
      <div class="relative mb-6" data-te-input-wrapper-init>
         <input
            type="text"
            class="peer block min-h-[auto] text-white outline-1 w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            aria-describedby="emailHelp"
            disabled
            value="${ADDRESSES[pAdd]}"
            id="paymentInput"
         />
      </div>
      <button
         type="button"
         id="copy-to-clipboard"
         class="btn btn-primary text-sm text-white text-nowrap bg-darkbg3 rounded-md p-2"
      >
         Copy Payment Information
      </button>

      <div class="mb-3">
         <label
            for="paymentFile"
            class="mb-2 inline-block text-white dark:text-neutral-200"
            >Payment proof:
         </label>
         <input
            class="relative m-0 text-white block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="paymentFile"
            name="paymentFile"
            accept=".jpg, .jpeg, .png, .pdf"
         />
         <small class="text-gray-200">Allowed formats: JPG, JPEG, PNG, PDF. Max size: 3MB</small>

      </div>
   
   `;
   paymentDiv.innerHTML = paymentInfoDOM;
   form.insertBefore(
      paymentDiv,
      document.querySelector("#payment-confirmation-btn")
   );

   requestConfirmationBTN.classList.remove("hidden");
   document
      .querySelector("#copy-to-clipboard")
      .addEventListener("click", copyToClipboard);
}

function validateFormDetails() {
   const paymentFile = document.querySelector("#paymentFile");
   // console.log(paymentFile);

   if (!paymentFile.files.length > 0) {
      return { error: true, msg: "You need to upload payment proof" };
   }
   if (
      paymentFile.files.length > 0 &&
      paymentFile.files[0].size > 3 * 1024 * 1024
   ) {
      return {
         error: true,
         msg: "File size exceeds the maximum allowed (3MB).",
      };
   }

   return { error: false, file: paymentFile.files[0] };
}

function copyToClipboard(e) {
   e.preventDefault();
   const paymentMethod = document.getElementById("txMethod");

   const textarea = document.createElement("textarea");
   textarea.value =
      ADDRESSES[
         `${String(
            paymentMethod[paymentMethod.value].textContent
         ).toUpperCase()}_ADDRESS`
      ];
   document.body.appendChild(textarea);

   textarea.select();
   document.execCommand("copy");

   document.body.removeChild(textarea);

   alert("Payment information copied to clipboard");
}

function objectToFormData(obj) {
   const formData = new FormData();

   for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
         formData.append(key, obj[key]);
      }
   }

   return formData;
}

document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById("deposit-form");

   form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const validateForm = validateFormDetails();

      if (validateForm.error) {
         return console.log(validateForm.msg);
      }

      const txMethod = document.getElementById("txMethod");
      const txAmount = document.getElementById("txAmount").value;

      const selectedOptionText =
         txMethod.options[txMethod.selectedIndex].textContent;

      const txObject = {
         txAmount,
         txMethod: selectedOptionText,
         paymentFile: validateForm.file,
      };

      const formData = objectToFormData(txObject);
      const entries = formData.entries();

      try {
         const response = await fetchDataFromRoute(
            "transactions",
            "post",
            formData,
            { userTransactionType: "Deposit" }
         );
         console.log(response);
         if (response.success) {
            // LOAD DOM MESSAGE
            document.querySelector("#transactionStatusButton").click();
         }
      } catch (error) {
         console.log(error);
      }
   });
});
