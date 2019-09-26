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
      margin: 0.5rem auto 3.5rem;
    }

    .wrapper {
      margin: 40px;
      width: 100%;
    }

    .heading {
      font-size: 68px;
      font-weight: 700;
      text-align: left;
      color: #424242;
      line-height: 1.8;
      margin: 0;
      padding-bottom: 14px;
      border-bottom: 1px dotted #f75175;
    }

    .site-title-wrapper {
      margin-bottom: 45px;
    }

    .site-title {
      font-size: 40px;
      font-weight: 700;
      margin: 0;
      text-transform: uppercase;
      background: #38c2f0;
      color: #ffffff;
      padding: 11px 18px;
    }

    .meta {
      font-size: 26px;
      text-shadow: 1px 1px #14141599;
      text-align: left;
      text-transform: uppercase;
      color: #f75175;
      margin: 0;
    }

    .tags-container {
      text-align: left;
      padding: 35px 0;
    }

    .tag {
      font-size: 30px;
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
  const { text, tags, time, date } = parsedReq;

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
        <p class="meta">${date} • ${time} MIN READ</p>
        <h1 class="heading">${sanitizeHtml(text)}</h1>
        ${renderTags(tags)}
      </div>
    </body>
</html>`;
}

const getImage = () =>
  `<img class="avatar"
        alt="Generated Image"
        src="data:image/jpeg;charset=utf-8;base64,${avatar}"
        width="220" />`;

const renderTags = (tags: string[]) => {
  return `<div class="tags-container">
            ${tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>`;
};
