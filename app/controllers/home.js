const path = require("path")

class HomeCtl {
  index(ctx) {
    ctx.body = `<h1>这是主页</h1><pre>${JSON.stringify(
      ctx.request,
      null,
      2
    )}</pre>`
  }
  upload(ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` }
  }
}

module.exports = new HomeCtl()
