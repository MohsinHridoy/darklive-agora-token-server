const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

exports.handler = async (event, context) => {
  const params = event.queryStringParameters;
  const channelName = params.channel;
  const uid = params.uid;

  if (!channelName || !uid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "channel and uid are required" }),
    };
  }

  const appID = process.env.APP_ID;
  const appCertificate = process.env.APP_CERTIFICATE;

  const role = RtcRole.PUBLISHER;
  const expireTime = Math.floor(Date.now() / 1000) + 3600;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    parseInt(uid),
    role,
    expireTime
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ token, uid, channel: channelName,appId:appID }),
  };
};
