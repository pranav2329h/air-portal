@'
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
'@ | Out-File -Encoding UTF8 tailwind.config.js
