const page = require("page.js");

page("/", () => (window.location.href = "dashboard.html"));
page(
   "/account-status",
   () => (window.location.href = "account-status.html")
);
page(
   "/account-status.html",
   () => (window.location.href = "account-status.html")
);
page("/dashboard.html", () => (window.location.href = "dashboard.html"));
page("/dashboard", () => (window.location.href = "dashboard.html"));
page("/deposit.html", () => (window.location.href = "deposit.html"));
page("/deposit", () => (window.location.href = "deposit.html"));
page("/funds.html", () => (window.location.href = "funds.html"));
page("/funds", () => (window.location.href = "funds.html"));
page(
   "/gold-insights.html",
   "/gold-insights",
   () => (window.location.href = "gold-insights.html")
);
page("/login.html", () => (window.location.href = "login.html"));
page("/login", () => (window.location.href = "login.html"));
page(
   "/marketing-landscape.html",
   "/marketing-landscape",
   () => (window.location.href = "marketing-landscape.html")
);
page("/niches.html", () => (window.location.href = "niches.html"));
page("/niches", () => (window.location.href = "niches.html"));
page("/portfolio.html", () => (window.location.href = "portfolio.html"));
page("/portfolio", () => (window.location.href = "portfolio.html"));
page(
   "/product-links.html",
   "/product-links",
   () => (window.location.href = "product-links.html")
);
page("/profile.html", () => (window.location.href = "profile.html"));
page("/profile", () => (window.location.href = "profile.html"));
page("/register.html", () => (window.location.href = "register.html"));
page("/register", () => (window.location.href = "register.html"));
page(
   "/transactions.html",
   () => (window.location.href = "transactions.html")
);
page("/transactions", () => (window.location.href = "transactions.html"));
page("/withdrawal.html", () => (window.location.href = "withdrawal.html"));
page("/withdrawal", () => (window.location.href = "withdrawal.html"));
page("/404.html", () => (window.location.href = "404.html"));
page("/404", () => (window.location.href = "404.html"));

page("*", () => {
   window.location.href = "404.html";
});
page();
