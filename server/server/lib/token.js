const jwt = require("jsonwebtoken");  // jwt 的 token 验证
const { secret } = require("../config");
// 生成token
exports.createToken = async (data, expiresIn= 24*3600) => {
  return await jwt.sign({ mobile: data }, secret, {
    expiresIn: expiresIn, // 24 hours
  });
};
// 获取请求头部的authorization是否携带了token， 解码
exports.verify = async token => {
  if (token) {
    try {
      let payload = await jwt.verify(token, secret);
      return payload;  // token 解码
      
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};
