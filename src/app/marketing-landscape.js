import { fetchDataFromRoute } from "../index";

document.addEventListener("DOMContentLoaded", async () => {
   try {
      const response = await fetchDataFromRoute(
         "users",
         "get",
         null,
         null
      );

      console.log(response)
   } catch (error) {}
});
