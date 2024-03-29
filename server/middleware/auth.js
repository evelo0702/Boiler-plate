const { User } = require("../models/User");
// 인증처리
let auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;
  // 토큰을 복호화 한후 유저를 찾음
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있으면 인증 o

  // 유저가 없을경우 인증 x
};
module.exports = { auth };
