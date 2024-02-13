async function fetchDataFromRoute(
   routeURL,
   requestType,
   bodyData,
   queryParams = {}
) {
   try {
      let URL = `${process.env.SERVER_URL}/${routeURL}`;
      const storedToken = localStorage.getItem("uvtkn");

      if (!storedToken) {
         console.log("No Token");
         //  return (window.location.href = "login.html");
      }

      if (queryParams != null && Object.keys(queryParams).length > 0) {
         const queryString = Object.entries(queryParams)
            .map(
               ([key, value]) =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&");
         URL += `?${queryString}`;
      }

      let headers;

      switch (true) {
         case window.location.href.includes("register.html"):
            headers = {
               "Content-Type": "application/json",
            };
            break;
         case window.location.href.includes("deposit.html"):
            headers = {
               Authorization: `Bearer ${storedToken}`,
            };
            break;
         default:
            headers = {
               "Content-Type": "application/json",
               Authorization: `Bearer ${storedToken}`,
            };
      }


      const requestOptions = {
         method: String(requestType).toUpperCase(),
         headers,
      };

      if (bodyData != null) {
         requestOptions.body = window.location.href.includes(
            "deposit.html"
         )
            ? bodyData
            : JSON.stringify(bodyData);
      }

      const response = await fetch(URL, requestOptions);
      console.log(response);

      if (!response.ok) {
         const errorData = await response.json(); // Parse error message from response
         throw new Error(errorData.msg);
      }

      return await response.json();
   } catch (error) {
      console.log(error);
      throw error;
   }
}

module.exports = {
   fetchDataFromRoute,
};
