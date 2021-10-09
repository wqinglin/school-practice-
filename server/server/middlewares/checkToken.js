const {verify } = require("../lib/token");
let url = require('url');
module.exports = async (ctx, next) => {
    //let pathname = url.parse(ctx.request.url).pathname;
    let method = ctx.request.method;
    let token = ctx.request.header["authorization"]; //重要重要重要,拿到前端的token
    //  get 不用 token 验证， 登录和退出不验证token
    let userPathRegs = [/api\/(login|logout|upload|delupload)/,/admin\/.+/,/doLogin/,/editor\/control/];
    let isUserPath = userPathRegs.find((reg) => reg.test(ctx.path));
    console.log(token);
    console.log(method);
    if (isUserPath || method=="GET") {
      // 不需要用户操作的放行
      //console.log('放行')
      await next();
    } else {
      if (!token) {
        ctx.body = {
          code: 801,
          msg: "没有token",
        };
        return;
      } else {
        let decode = await verify(token); //{ mobile: '13811269437', iat: 1625811541, exp: 1625897941 }
        console.log('===========================');
        console.log(decode);  // 
        if (decode) {
          ctx.state.mobile = decode.mobile; //重要重要定义token解码后的用户id存为全局变量
          await next();
        } else {
          ctx.body = {
            code: 802,
            msg: "登录过期，请重新登录",
          };
        }
      }
    }
  }
