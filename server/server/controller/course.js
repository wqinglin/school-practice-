const OSS = require("ali-oss");
const fs = require('fs');
/* let client = new OSS({
  region: "http://oss-ruan.oss-cn-beijing.aliyuncs.com",
  accessKeyId: "LTAInUqvCpNGp8jl",
  accessKeySecret: "CfGmavUBt8zCjnPSWkmYH6Ygvaed5Z",
  bucket: "oss-ruan",
}); */

const { catlogModel,courseModel, categoryModel } = require("../model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
class courseController {
  // 添加文章
  static async add(ctx) {
    let data = await categoryModel.findAll({});
    await ctx.render("admin/course/add", { data: data });
  }

  static async doadd(ctx) {
    // post   ctx.request.body
    //{title,content,readCount,categoryId} = ctx.req.body ;
    let params = ctx.req.body; // 注意注意注意注意注意注意注意 不是  ctx.request.body
    // 把用户上传的图片路径写到 req.body 里
    //console.log(ctx.req.file); // 注意注意注意注意注意注意
    params.imgurl = ctx.req.file.filename;
    await courseModel.create(params);
    ctx.redirect("/admin/course");
  }
  // 文章列表+分页
  static async list(ctx) {
    let { currentPage, keyword } = ctx.query;
    currentPage = currentPage === undefined ? 1 : Number(currentPage); // 当前页码
    let pageSize = 3; // 每页条数
    let where = {},
      include = [];

    // 没有指定返回字段的情况下返回全部字段
    if (keyword) {
      where = {
        title: {
          [Op.like]: "%" + keyword + "%",
        },
      };
    }

    include = [{ model: categoryModel, attributes: ["name"] }];
    let allResponse = await courseModel.findAll({ where, include });
    let total = allResponse.length; // 全部条数
    let totalPage = Math.ceil(total / pageSize); // 页数
    let prev = currentPage - 1 <= 1 ? 1 : currentPage - 1;
    let next = currentPage + 1 >= totalPage ? totalPage : currentPage + 1;
    let response = await courseModel.findAll({
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
      where,
      include,
      order: [["id", "DESC"]],
    });
    console.log(response);
    await ctx.render("admin/course/list", {
      data: response,
      totalPage,
      currentPage,
      next,
      prev,
      keyword,
    });
  }
  // 删除文章
  static async del(ctx) {
    let id = ctx.params.id;
    await courseModel.destroy({
      where: { id },
    });
    ctx.redirect("/admin/course");
  }
  // 更新文章
  static async edit(ctx) {
    let id = ctx.params.id;
    //  ctx.query.id(?get传), ctx.request.body.id(表单post传值), ctx.params.id(get动态传值)
    let data = await categoryModel.findAll(); // category分类名称
    let dataone = await courseModel.findOne({ where: { id } }); // 更新拿旧值
    await ctx.render("admin/course/edit", { dataone: dataone, data: data });
  }

  static async doedit(ctx) {
    let id = ctx.query.id;
    let params = ctx.req.body; // ctx.request.body 因为有上传所以 ctx.req.body
    console.log(id);
    console.log(ctx.req.body);
    if (ctx.req.file) {
      // 有图的修改
      params.imgurl = ctx.req.file.filename;
    }
    console.log(params);
    await courseModel.update(params, { where: { id } });
    ctx.redirect("/admin/course");
  }

  static async chapter(ctx) {
    let id = ctx.params.id;
    let data = await catlogModel.findAll({where:{pid:0,courseId:id}}); // 所有一级目录章信息
    await ctx.render("admin/course/chapter", { courseId: id, data: data });
  }


  static async saveChapter(ctx) {
     let params = ctx.request.body;
     //console.log(params);
     let result = await catlogModel.create(params);
    if (result) {
      ctx.body = {
        code: 1,
        msg: "添加章成功"
      };
    } else {
      ctx.body = {
        code: 800,
        msg: "添加章失败",
      };
    }
  }
  static async saveVideo(ctx) {
    let params = ctx.req.body;
    params.video_url = ctx.req.file.filename;
    console.log(params);
    await catlogModel.create(params);
    let data = await catlogModel.findAll(); // 目录
    await ctx.render("admin/course/chapter", { courseId: params.courseId, data: data });
    
  }
}

module.exports = courseController;
