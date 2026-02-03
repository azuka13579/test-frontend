const btn = document.getElementById("magicBtn");
const output = document.getElementById("output");
const toggleTheme = document.getElementById("toggleTheme");

const messages = [
  "Kamu keren hari ini 😎",
  "Semangat terus ya 🚀",
  "Ngoding dikit, rebahan dikit 😌",
  "Future looks bright ✨",
  "Jangan lupa minum air 💧",
];

btn.addEventListener("click", () => {
  const random = Math.floor(Math.random() * messages.length);
  output.textContent = messages[random];
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleTheme.textContent = document.body.classList.contains("light")
    ? "☀️"
    : "🌙";
});
