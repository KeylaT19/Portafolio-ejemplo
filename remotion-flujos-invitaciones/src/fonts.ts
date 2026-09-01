import { continueRender, delayRender, staticFile } from "remotion";

export const headingFont = "MontserratLocal";

let started = false;

if (typeof document !== "undefined" && !started) {
  started = true;
  const handle = delayRender("Loading Montserrat heading font");

  const style = document.createElement("style");
  style.textContent = `
    @font-face {
      font-family: "${headingFont}";
      src: url("${staticFile("fonts/Montserrat-Bold.woff2")}") format("woff2");
      font-weight: 700 900;
      font-style: normal;
      font-display: block;
    }
  `;
  document.head.appendChild(style);

  const font = new FontFace(
    headingFont,
    `url(${staticFile("fonts/Montserrat-Bold.woff2")}) format("woff2")`,
    { weight: "700 900" },
  );

  font
    .load()
    .then((loaded) => {
      document.fonts.add(loaded);
      continueRender(handle);
    })
    .catch(() => {
      continueRender(handle);
    });
}
