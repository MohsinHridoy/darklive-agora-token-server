const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Your Agora credentials
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

app.get("/rcttoken/host", (req, res) => {
  const channelName = req.query.channel;
  const uid = req.query.uid;

  if (!channelName || !uid) {
    return res.status(400).json({ error: "channel and uid are required" });
  }

  const role = RtcRole.PUBLISHER; // Host
  const expirationTimeInSeconds = 36; // 1 hour
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    parseInt(uid),
    role,
    privilegeExpiredTs
  );

  return res.json({
    token: token,
    uid: uid,
    channel: channelName,
  });
});

app.listen(PORT, () => {
  console.log(`Agora token server running on http://localhost:${PORT}`);
});
