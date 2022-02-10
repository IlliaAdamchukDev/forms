const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

server.use(middlewares);
server.use(jsonServer.bodyParser);

const RSA_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHsGeQMDvrqGMMdTidh55hCGhKCKCwbIcjHuiw4pCzzwXxt+VioZ
gyq5OpK64nIxi5106pRzWVlI55vQ5vP45rjnKYb3HnYVkIsLI1t0lUBB8UyDazyz
U09fgpfDWa+KO7EZlFF4Rii373PNGAXMh81XOmkEFpQ04Tm8IXt1hTbTAgMBAAEC
gYApELwMGY/syyY1Itl8fRQiqARVYj7UAMy9hha8n061BLd6ge1ZGDMEa9f1apRz
8b3czU4QR4CnoQJOrKiq/4Zj8v/YsA1kTVqUzumLtjGHqfakE0bX+Q1uXHI9B4Os
EKs2QLEuzqclSR6DDzvF5WF8pBdtzj6n6bMZwaPBJRnwwQJBAMVfUWKGktR2DGI6
/FeyacAyFk9YjObqW5MhE1hId7LgD9T5ewbDyVz0yAIFpcnwjJ/TWS6WjcJi+gqN
341wj5kCQQCfkZ7bEFLovZmOwrTG4gU6eej+EVaIzQmW6u6bpafCHW7bAnqy+Pzp
kAmUIZ8kcPBrhh77CSax1nGhaOLn/21LAkBuB4hAS9NY/AJFVKrOXNjVW1bSnwPV
yzqH1/2HzsZkAsLwsK/kAouj9ZX2gp186UwL4W+rKCUZA8Ju1c6Vc/WpAkEAkrfP
a7dHtG5Y2hYXKGM70Xe0jp+chG6aqaRcPssDRA3SFxfhf9xGl+7zj7uWW2ho90S8
CbBxXsVBd9s7/3sxnwJAN++DNT5c21dU/zFbvxJ8nyfwdom27kYhU91MmDA7GBMq
8NmKS8obYvc9TQWWsTm9l6h48Y7rEGh52Es1x8SfbA==
-----END RSA PRIVATE KEY-----`; //process.env['PRIVATE_KEY'];
const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHsGeQMDvrqGMMdTidh55hCGhKCK
CwbIcjHuiw4pCzzwXxt+VioZgyq5OpK64nIxi5106pRzWVlI55vQ5vP45rjnKYb3
HnYVkIsLI1t0lUBB8UyDazyzU09fgpfDWa+KO7EZlFF4Rii373PNGAXMh81XOmkE
FpQ04Tm8IXt1hTbTAgMBAAE=
-----END PUBLIC KEY-----`; //process.env['PUBLIC_KEY'];

let users = [
  {
    userId: -1,
    entered: Date.now(),
  },
];

server.post('/login', (req: any, res: any) => {
  let user = db.data.find(
    (el: { email: string; password: string; id: string }) =>
      el.email === req.body.email
  );
  if (!user || !(user.password === req.body.password)) {
    return res.status(401).json({ message: 'User not found' });
  }

  let userIndex = users.findIndex((el: any) => el.userId === user.id);
  if (userIndex >= 0) {
    if (Date.now() - users[userIndex].entered <= 10000) {
      return res.status(429).json({ message: 'Too many requests' });
    }
    users.splice(userIndex, 1);
  }
  users.push({
    userId: user.id,
    entered: Date.now(),
  });

  const payload = {
    sub: user.id,
    iat: Date.now(),
    exp: Date.now() + 9000000,
  };

  const jwtBearerToken = jwt.sign(payload, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
  });

  return res.status(200).json({
    expires: payload.exp,
    token: jwtBearerToken,
  });
});

server.get('/forms', (req: any, res: any) => {
  try {
    if (jwt.verify(req.headers.authorization.substring(7), RSA_PUBLIC_KEY)) {
      return res.status(200).json({ message: 'Valid' });
    }
    return res.status(401).json({ message: 'Invalid' });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid' });
  }
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
