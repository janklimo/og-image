import { readFileSync } from "fs";
import { ParsedRequest } from "./types";
import { sanitizeHtml } from "./sanitizer";

const regular = readFileSync(
  `${__dirname}/../_fonts/pt-sans-regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/pt-sans-bold.woff2`).toString(
  "base64"
);

const avatar = readFileSync(`${__dirname}/../_images/avatar.jpg`).toString(
  "base64"
);

function getCss() {
  return `
    @font-face {
      font-family: 'PT Sans';
      font-style:  normal;
      font-weight: normal;
      src: url(data:font/woff2;charset=utf-8;base64,${regular}) format('woff2');
    }

    @font-face {
      font-family: 'PT Sans';
      font-style:  normal;
      font-weight: bold;
      src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
      font-family: "PT Sans", sans-serif;
      background: #fefefe;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
    }

    .avatar-wrapper {
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      justify-items: center;
    }

    .avatar {
      border-radius: 50%;
      margin: 2rem auto 4.5rem;
    }

    .wrapper {
      margin: 100px 250px;
      width: 100%;
    }

    .heading {
      font-size: 105px;
      font-weight: 700;
      text-align: left;
      color: #424242;
      line-height: 1.8;
    }

    .site-title-wrapper {
      margin-bottom: 65px;
    }

    .site-title {
      font-size: 50px;
      font-weight: 700;
      margin: 0;
      text-transform: uppercase;
      background: #38c2f0;
      color: #ffffff;
      padding: 11px 18px;
    }

    .meta {
      text-align: left;
      text-transform: uppercase;
      color: #f75175;
      font-size: 36px;
      margin: 0;
    }

    .description {
      text-align: left;
      color: #aeadad;
      font-size: 46px;
      margin: 14px 0;
      padding-bottom: 60px;
      border-bottom: 1px dotted #f75175;
    }

    .tags-container {
      text-align: left;
      padding: 30px 0;
    }

    .tag {
      font-size: 32px;
      color: white;
      text-transform: uppercase;
      background: #4cc2f1;
      padding: 11px 18px;
      font-weight: bold;
      margin-right: 20px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, description, tags } = parsedReq;

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      ${getCss()}
    </style>
    <body>
      <div class="wrapper">
        <div class="site-title-wrapper">
          <span class="site-title">Klimo.io</span>
        </div>
        <div class="avatar-wrapper">
          ${getImage()}
        </div>
        <p class="meta">SEPTEMBER 17, 2019 • 2 MIN READ</p>
        <div class="heading">${sanitizeHtml(text)}</div>
        <p class="description">${sanitizeHtml(description)}</p>
        ${renderTags(tags)}
      </div>
    </body>
</html>`;
}

const getImage = () =>
  `<img class="avatar"
        alt="Generated Image"
        src="data:image/jpeg;charset=utf-8;base64,${avatar}"
        width="300" />`;

const renderTags = (tags: string[]) => {
  return `<div class="tags-container">
            ${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>`;
};
