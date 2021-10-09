const { categoryModel, sequelize } = require('../model')

class categoryController {
    // 分类列表
    static async list(ctx) {
        let data = await categoryModel.findAll({});
        console.log(data);
        await ctx.render('admin/category/list', {data:data})
    }

    //添加
    static async add(ctx) {
        await ctx.render("admin/category/add");
    }
    static async doadd(ctx) {
        let params = ctx.req.body;
        params.imgurl =ctx.req.file.filename;
        await categoryModel.create(params)
        ctx.redirect('/admin/category')
    }
    // 修改
    static async edit(ctx) {
        let id = ctx.params.id;
        let dataone = await categoryModel.findOne({where:{id}})
        await ctx.render("admin/category/edit", { dataone: dataone });
    }
    static async doedit(ctx) {
        let id = ctx.req.body.id;
        let params = ctx.req.body  // ctx.request.body 因为有上传所以 ctx.req.body
        if(ctx.req.file){
            // 有图的修改
            params.imgurl =ctx.req.file.filename;
        }
        console.log(params);
       await categoryModel.update(params, { where: { id } })
        ctx.redirect('/admin/category')
    }

    static async del(ctx) {
        const id = ctx.params.id
        await categoryModel.destroy({where:{id}})
        ctx.redirect('/admin/category')
    }

}

module.exports = categoryController