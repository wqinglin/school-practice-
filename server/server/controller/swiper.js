const { swiperModel } = require('../model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

class swiperController {
    // 添加文章
    static async add(ctx) {
        let data= await swiperModel.findAll({})
        await ctx.render('admin/swiper/add',{data:data})
    }

    static async doadd(ctx) {
        // post   ctx.request.body
        //{title,content,readCount,categoryId} = ctx.req.body ;
        let params = ctx.req.body  // 注意注意注意注意注意注意注意 不是  ctx.request.body
        // 把用户上传的图片路径写到 req.body 里
        //console.log(ctx.req.file);  // 注意注意注意注意注意注意
        params.imgurl =ctx.req.file.filename;
        await swiperModel.create(params)
        ctx.redirect("/admin/swiper"); 
        
    }
    //轮播图
    static async list(ctx) {
        let { currentPage, keyword} = ctx.query
        currentPage = currentPage===undefined? 1 : Number(currentPage)  // 当前页码
        let pageSize = 3  // 每页条数
        let where = {},
            include = [];
        
            // 没有指定返回字段的情况下返回全部字段
            if(keyword){
                where = {
                title: {
                    [Op.like]: '%'+keyword+'%'
                }
            }
            }
            
        let allResponse = await swiperModel.findAll({ where})
        let total = allResponse.length // 全部条数
        let totalPage = Math.ceil(total / pageSize)   // 页数
        let prev = currentPage - 1 <= 1 ? 1 : currentPage - 1;
        let next = currentPage + 1 >= totalPage ? totalPage : currentPage + 1;
        let response = await swiperModel.findAll({
            offset: (currentPage - 1) * pageSize,
            limit: pageSize,
            where,
            include,
            order: [['id', 'DESC']]
        })
        console.log(response);
        await ctx.render('admin/swiper/list', {data:response,totalPage,currentPage,next,prev,keyword})

    }
    // 删除文章
    static async del(ctx) {
        let id  = ctx.params.id
        await swiperModel.destroy({
            where: { id },
        }) 
        ctx.redirect("/admin/swiper"); 
    }
    // 更新文章
    static async edit(ctx) {
        let id = ctx.params.id;  
        //  ctx.query.id(?get传), ctx.request.body.id(表单post传值), ctx.params.id(get动态传值)
        let dataone = await swiperModel.findOne({where:{id}}) // 更新拿旧值
        await ctx.render('admin/swiper/edit',{dataone:dataone})
    }

    static async doedit(ctx) {
        let id = ctx.query.id;
        let params = ctx.req.body  // ctx.request.body 因为有上传所以 ctx.req.body
        console.log(id);
        console.log(ctx.req.body);
        if(ctx.req.file){
            // 有图的修改
            params.imgurl =ctx.req.file.filename;
        }
        console.log(params);
       await swiperModel.update(params, { where: { id } })
        ctx.redirect("/admin/swiper");
    }
   
}

module.exports = swiperController