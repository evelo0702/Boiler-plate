const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    // 공백을 없애는 역할을 해줌
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  // 비밀번호를 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
        // store hash in your password db
      });
    });
  } else {
    next();
  }
});
// 입력한 비밀번호와 암호화된 비밀번호를 비교하는 메소드
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 입력한 비밀번호를 암호화해서 db에 저장된 암호화된 비밀번호와 동일한지를 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 토큰생성
userSchema.methods.generateToken = function (cb) {
  let user = this;
  // jsonwebtoken을 이용해서 토큰 생성
  let token = jwt.sign(user._id.toJSON(), "secret");
  user.token = token;
  user
    .save()
    .then(() => {
      cb(null, user);
    })
    .catch((err) => {
      cb(err);
    });
};

// 토큰 찾기
userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  // 토큰을 decode함
  jwt.verify(token, "secret", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

    user
      .findOne({ token: token })
      .then((user) => console.log(user), cb(null, user))
      .catch((err) => cb(err));
  });
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
