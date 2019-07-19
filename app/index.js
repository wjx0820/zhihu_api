const Koa = require("koa")
const koaBody = require("koa-body")
const koaStatic = require("koa-static")
const error = require("koa-json-error")
const parameter = require("koa-parameter")
const mongoose = require("mongoose")
const app = new Koa()
const { connectionStr } = require("./config")
const routing = require("./routes")
const path = require("path")

// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (err) {
//     ctx.status = err.status || err.statusCode || 500
//     ctx.body = {
//       message: err.message
//     }
//   }
// })

mongoose.connect(connectionStr, { useNewUrlParser: true }, () =>
  console.log("MongoDB连接成功!")
)
mongoose.connection.on("error", console.error)

app.use(koaStatic(path.join(__dirname, "/public")))

app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
  })
)

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads"),
      keepExtensions: true
    }
  })
)

app.use(parameter(app))

routing(app)

app.listen(3000, () => {
  console.log("koa启动，监听3000端口!")
})
