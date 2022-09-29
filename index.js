const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./user-data-dir",
    args: ["--disable-features=WebRtcHideLocalIpsWithMdns"],
  });
  const page = await browser.newPage();

  const client = await page.target().createCDPSession();

  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: "./downloads",
  });

  await page.goto("https://haxball.com/headless", {
    waitUntil: "networkidle2",
  });

  page.on("console", async (msg) => {
    const msgArgs = msg.args();
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue());
    }
  });

  page.on("error", async (msg) => {
    const msgArgs = msg.args();
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue());
    }
  });

  page.addScriptTag({ path: "./haxball_script.js" });
})();
