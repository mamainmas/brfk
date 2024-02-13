const { fetchDataFromRoute } = require("../index");
document.addEventListener("DOMContentLoaded", initTransactions);

async function initTransactions(e) {
   e.preventDefault();
   document.querySelector("#loaderContainer").classList.remove("hidden");

   try {
      const res = await fetchDataFromRoute("users", "get", null, null);
      const txs = res.user.userTransactions;

      const txIds = [];

      if (txs.Deposit.length > 0) {
         txs.Deposit.forEach((tx) => txIds.push(tx));
      }

      if (txs.Withdrawal.length > 0) {
         txs.Withdrawal.forEach((tx) => txIds.push(tx));
      }

      const { txs: txData } = await fetchDataFromRoute(
         "transactions",
         "get",
         null,
         { txIds: JSON.stringify(txIds) }
      );

      if (txData.length > 0) {
         loadDOMTX(txData);
      }
   } catch (error) {
      console.log(error);
   }
}

function loadDOMTX(tableData) {
   const tableBody = document.querySelector("#table-body");
   tableData.forEach((tdt, i) => {
      const tableRow = document.createElement("tr");
      tableRow.classList.add("border-b", "dark:border-neutral-500");
      const tableHTMLData = `
        <td
            class="whitespace-nowrap px-6 py-4 font-medium"
        >
            ${(i += 1)}
        </td>
        <td class="whitespace-nowrap px-6 py-4">
            ${tdt.txType}
        </td>
        <td class="whitespace-nowrap px-6 py-4">
            ${tdt.txMethod}
        </td>
        <td class="whitespace-nowrap px-6 py-4">
            ${tdt.txAmount}
        </td>
        <td class="whitespace-nowrap px-6 py-4">
            ${tdt.txStatus}
        </td>
        <td class="whitespace-nowrap px-6 py-4">
            ${new Date(tdt.createdAt).toLocaleDateString("en-US", {
               month: "2-digit",
               day: "2-digit",
               year: "2-digit",
            })}
        </td>    
    `;

      tableRow.innerHTML = tableHTMLData;
      tableBody.appendChild(tableRow);
   });

   document.querySelector("#loaderContainer").classList.add("hidden");
}
