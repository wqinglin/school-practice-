const { couponModel, sequelize } = require('../model')

class couponController {
    // 分类列表
    static async list(ctx) {
        let data = await couponModel.findAll({});
        console.log(data);
        await ctx.render('admin/coupon/list', {data:data})
    }

    //添加
    static async add(ctx) {
        await ctx.render("admin/coupon/add");
    }
    static async doadd(ctx) {
        let params = ctx.request.body;
        let from_to = params['from_to'].split(' - ');
        let from_time =new Date(from_to[0]).getTime()
        let to_time = new Date(from_to[1]).getTime()
        delete params.from_to; 
        params["from_time"] = from_time;
        params["to_time"] = to_time;
        console.log(params);
        await couponModel.create(params)
        ctx.redirect('/admin/coupon')
    }
    // 修改
    static async edit(ctx) {
        let id = ctx.params.id;
        let dataone = await couponModel.findOne({where:{id}})
        await ctx.render("admin/coupon/edit", { dataone: dataone });
    }
    static async doedit(ctx) {
        let id = ctx.req.body.id;
        let params = ctx.req.body  // ctx.request.body 因为有上传所以 ctx.req.body
        if(ctx.req.file){
            // 有图的修改
            params.imgurl =ctx.req.file.filename;
        }
        console.log(params);
       await couponModel.update(params, { where: { id } })
        ctx.redirect('/admin/coupon')
    }

    static async del(ctx) {
        const id = ctx.params.id
        await couponModel.destroy({where:{id}})
        ctx.redirect('/admin/coupon')
    }

}

module.exports = couponController