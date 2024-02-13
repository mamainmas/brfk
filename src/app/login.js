const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", getFormDetails);

async function getFormDetails(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Invalid email format");
    return;
  }

  if (!password.trim()) {
    console.log("email and password cannot be empty");
    return;
  }

  const formData = {
    email: email,
    password: password,
  };

  console.log(JSON.stringify(formData));

  try {
    const response = await fetch(`${process.env.SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log("Server response:", responseData);

    if (localStorage.getItem("uvtkn")) {
      localStorage.removeItem("uvtkn");
      localStorage.setItem("uvtkn", responseData.token);
    } else {
      localStorage.setItem("uvtkn", responseData.token);
    }

    // console.log(localStorage)
    window.location.href = "dashboard.html"
  } catch (error) {
    console.error("Error:", error);
  }
}
