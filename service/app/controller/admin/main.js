'use strict'
 const Controller = require('egg').Controller

 class MainController extends Controller {
     async index() {
         this.ctx.body = 'hi egg'
     }
     // 登录校验的接口 后续可以引入加密 md5 或者其他的
     async checkLogin() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        // let sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '"+ password +"'"
        let sql = `SELECT userName FROM admin_user WHERE userName =  "${userName}" AND password = ${password} `
        const res = await this.app.mysql.query(sql);
        if (res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = {openId};
            this.ctx.body = {
                data: '登录成功',
                openId
            }
        } else {
            this.ctx.body = {
                data: '登录失败'
            }
        }
     }
 }

 module.exports = MainController