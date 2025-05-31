const svgCaptcha = require("svg-captcha");
const { v4: uuidv4 } = require("uuid");

// Assuming you have a Redis client configured and exported, e.g. from ../config/redisClient.js
const redisClient = require("../utils/redisClient");

// Generate CAPTCHA and save to Redis
const generateCaptcha = async (req, res) => {
  try {
    // Generate random captcha with 5 chars (letters + numbers)
    const captcha = svgCaptcha.create({
      size: 5,
      noise: 2,
      ignoreChars: "0o1il", // avoid confusing chars
      color: true,
      background: "#cc9966",
      width: 150,
      height: 50,
    });

    const captchaId = uuidv4();

    // Save captcha text in Redis with 5 min TTL (300 seconds)
    await redisClient.setEx(`captcha:${captchaId}`, 300, captcha.text);

    // Encode SVG to base64 for data URI
    const svgBase64 = Buffer.from(captcha.data).toString("base64");

    res.json({
      captchaId,
      image: `data:image/svg+xml;base64,${svgBase64}`,
    });
  } catch (error) {
    console.error("Error generating CAPTCHA:", error);
    res.status(500).json({ error: "Failed to generate CAPTCHA" });
  }
};

// Verify CAPTCHA text for a given captchaId
const verifyCaptcha = async (captchaId, captchaText) => {
  if (!captchaId || !captchaText) return false;

  // Fetch captcha text from Redis
  const savedCaptcha = await redisClient.get(`captcha:${captchaId}`);

  if (!savedCaptcha) return false;

  // Case-insensitive compare
  if (savedCaptcha.toLowerCase() === captchaText.toLowerCase()) {
    // Optionally delete captcha so it can't be reused
    await redisClient.del(`captcha:${captchaId}`);
    return true;
  }

  return false;
};

module.exports = {
  generateCaptcha,
  verifyCaptcha,
};
