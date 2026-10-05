module.exports = {
  content: ["./app/**/*.{js,jsx}", "./data/**/*.js"],
  theme: {
    extend: {
      colors: { pine: "#1F3A3D", mist: "#E6EFEC", foam: "#8CC7B5", dusk: "#A9B4E8", sun: "#F2D98B", paper: "#F7FAF9" },
      fontFamily: { display: ["var(--font-display)", "sans-serif"], body: ["var(--font-body)", "sans-serif"] },
      keyframes: { breathe: { "0%,100%": { transform: "scale(.72)" }, "50%": { transform: "scale(1)" } } },
      animation: { breathe: "breathe 10s ease-in-out infinite" },
    },
  },
  plugins: [],
};
