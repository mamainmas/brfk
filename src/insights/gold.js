import * as INSIGHTS from "../../gold-insights.json";

const columns = [
  { label: "Name", field: "name" },
  { label: "Capital", field: "capital" },
  { label: "Progress", field: "progress" },
  { label: "Current", field: "current" },
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

// asyncTable.update(
asyncTable.update(
  {
    rows: shuffleArray(INSIGHTS).map((user) => ({
      name: user.name,
      capital: user.capital,
      progress: `<div class="bg-darkbg p-0.5 text-center text-white text-xs font-medium leading-none text-primary-100" style="width: ${user.percentage}%">${user.percentage}%</div>`,
      profit: (Number(user.capital) / 100) * 1000,
      current: Math.round(
        (Number(user.capital) / 10) * Number(user.percentage)
      ),
    })),
  },
  { loading: false }
);
//   });
