import express from 'express';
import ImageKit from 'imagekit';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

router.get('/auth', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result); // Contains {token, expire, signature}
});

export default router;
