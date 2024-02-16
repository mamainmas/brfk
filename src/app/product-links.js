import "tw-elements";

const categories = require("./../../product-links.json");

document.addEventListener("DOMContentLoaded", (e) => {
   e.preventDefault();

   const container = document.getElementById("collapseContainer");

   categories.forEach((item) => {
      const trigger = document.createElement("button");
      trigger.className = "btn-collapse";
      trigger.innerHTML = `${item.category} &darr;`;
      // trigger.textContent = `${item.category} &darr;`;
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", `collapse-${item.category}`);

      const contentContainer = document.createElement("div");
      contentContainer.className = "content-container hidden";
      contentContainer.setAttribute("id", `collapse-${item.category}`);

      const listContent = document.createElement("ul");
      listContent.className = "border border-2"
      item.items.forEach((a) => {
         let lItm = document.createElement("li");
         lItm.className = "bg-gray-300 p-2 border-2 border-gray-300"
         lItm.textContent = a;
         listContent.appendChild(lItm);
      });
      contentContainer.appendChild(listContent);

      // Toggle visibility on button click
      trigger.addEventListener("click", () => {
         const expanded = trigger.getAttribute("aria-expanded") === "true";
         trigger.setAttribute("aria-expanded", String(!expanded));
         contentContainer.classList.toggle("hidden");
      });

      container.appendChild(trigger);
      container.appendChild(contentContainer);
   });

   });
