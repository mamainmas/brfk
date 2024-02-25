const { fetchDataFromRoute } = require("../index");

document.addEventListener("DOMContentLoaded", async (e) => {
   e.preventDefault();

   const { MRPlans } = await fetchDataFromRoute("mrplans", "get");

   const columns = [
      { label: "Name", field: "name" },
      { label: "Capital", field: "capital" },
      { label: "Progress", field: "progress" },
      //  { label: "Current", field: "current" },
      { label: "Profit", field: "profit" },
   ];

   const asyncTable = new te.Datatable(
      document.getElementById("gold-datatable"),
      { columns },
      { loading: true }
   );

   const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
   };

   asyncTable.update(
      {
         rows: shuffleArray(MRPlans).map((user) => ({
            name: user.fullName,
            capital: user.investAmount,
            progress: `
              <div
                class="bg-darkbg py-1 px-2 text-right text-white text-xs font-medium rounded-md leading-none text-primary-100" style="width: ${
                   user.currentAmount > 0
                      ? Number((((user.currentAmount) /
                           user.investAmount) *
                           100) /
                        10).toFixed()
                      : 0
                }%">${
               user.currentAmount > 0
                  ? Number((((user.currentAmount) /
                       user.investAmount) *
                       100) /
                    10).toFixed()
                  : 0
            }%
              </div>
            `,
            profit: Math.round(user.currentAmount),
         })),
      },
      { loading: false }
   );

   console.log(MRPlans);
   console.log(name);
});
