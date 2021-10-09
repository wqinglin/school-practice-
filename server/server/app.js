const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require("koa-cors");
const index = require('./routes/index');
const api = require('./routes/api');
const session = require('koa-session');
const checkAuth = require("./middlewares/checkAuth");
const checkToken = require("./middlewares/checkToken");


app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:sess', //cookie key (default is koa:sess)
    maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, //是否可以 overwrite (默认 default true)
    httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, //签名默认 true
    rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
    renew: false, //(boolean) renew session when session is nearly expired,
}
app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
 ctx.set('Access-Control-Allow-Origin','*');
  ctx.set("Access-control-Allow-Methods", '*');
  ctx.set("Access-Control-Max-Age", 1728000);
  ctx.set(
    "Access-control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  ); // 设置接收携带Authorization的请求
  if (ctx.method == 'OPTIONS') {  // 设置跨越, 预连接 :传输类型 OPTIONs 
    
    ctx.body = 200; 
  } else {
    await next();
  }
});  
app.use(cors());


app.use(checkAuth); // 校验权限中间件
app.use(checkToken); // 校验登录中间件






// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// routes
app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())





// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
