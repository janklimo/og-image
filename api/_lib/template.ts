import { readFileSync } from "fs";

const regular = readFileSync(
  `${__dirname}/../_fonts/pt-sans-regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/pt-sans-bold.woff2`).toString(
  "base64"
);

const avatar = readFileSync(`${__dirname}/../_images/avatar.jpg`).toString(
  "base64"
);
const tada = readFileSync(`${__dirname}/../_images/tada.png`).toString(
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
      margin: 2rem auto;
    }

    .wrapper {
      margin: 150px 250px;
      width: 100%;
    }

    .heading {
      font-size: 100px;
      font-weight: 700;
      text-align: left;
      color: #424242;
      line-height: 1.8;
    }

    .site-title-wrapper {
      margin-bottom: 65px;
    }

    .site-title {
      font-size: 55px;
      font-weight: 700;
      margin: 0;
      text-transform: uppercase;
      background: #38c2f0;
      color: #ffffff;
      padding: 11px 18px;
    }

    .new-blog-post {
      color: #aeadad;
      font-size: 40px;
    }`;
}

export function getHtml() {
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
        <p class="new-blog-post">
          New blog post
          ${getEmoji()}
        </p>
        <div class="heading">
          My blog post title
        </div>
      </div>
    </body>
</html>`;
}

function getImage() {
  return `<img
        class="avatar"
        alt="Generated Image"
        src="data:image/jpeg;charset=utf-8;base64,${avatar}"
        width="350"
    />`;
}

function getEmoji() {
  return `<img
        class="tada"
        alt="Party popper"
        src="data:image/png;charset=utf-8;base64,${tada}"
        width="30"
    />`;
}
