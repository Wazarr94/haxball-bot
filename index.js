const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./user-data-dir",
    args: ["--disable-features=WebRtcHideLocalIpsWithMdns"],
  });
  const page = await browser.newPage();

  // https://stackoverflow.com/questions/47539043/how-to-get-all-console-messages-with-puppeteer-including-errors-csp-violations
  page
    .on('console', message =>
      console.log(`${message.type().substring(0, 3).toUpperCase()} ${message.text()}`))
    .on('pageerror', ({ message }) => console.log(message))
    .on('response', response =>
      console.log(`${response.status()} ${response.url()}`))
    .on('requestfailed', request =>
      console.log(`${request.failure().errorText} ${request.url()}`))

  const client = await page.target().createCDPSession();

  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: "./downloads",
  });

  await page.goto("https://haxball.com/headless", {
    waitUntil: "networkidle2",
  });

  page.addScriptTag({ path: "./haxball_script.js" });
})();
