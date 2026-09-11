const fs = require("fs");
const path = require("path");

const CSS_DIR = path.join(__dirname, "..", "assets", "css");

const tailwind = fs.readFileSync(path.join(CSS_DIR, "tailwind.css"), "utf8");
const landing = fs.readFileSync(path.join(CSS_DIR, "landing-page.css"), "utf8");

fs.writeFileSync(path.join(CSS_DIR, "style.css"), tailwind + landing);
console.log("[build-css] assets/css/style.css written.");
