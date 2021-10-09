const Router = require("koa-router");
const router = new Router();
const apiController = require("../controller/api");

// 上传
const upload = require("../lib/upload");

// 轮播图接口
router.get("/api/getswiper", apiController.getswiper);

// 分类接口
router.get("/api/cates", apiController.cates);

// 通过分类编号查询对应商品
router.get("/api/goodsbycateId/:cateId", apiController.goodsbycateId);

// 商品推荐接口
router.get("/api/recommend", apiController.recommend);

// 查询所有分类下对应的前5条数据 catesAndGoods
router.get("/api/catesAndGoods", apiController.catesAndGoods);

// 商品详情页
//router.get("/api/goodsDetail/:id", apiController.goodDetail);
// 课程详情
router.get("/api/getCourseDetail/:id", apiController.getCourseDetail);
router.get("/api/getCourseCatlog/:id", apiController.getCourseCatlog);
//router.get("/api/getSpeCourse/:id", apiController.getSpeCourse);


// 搜索接口
router.get("/api/search/:keyword", apiController.search);

// 登录和退出接口
router.post("/api/login", apiController.login);
router.post("/api/logout", apiController.logout);

//getVideoUrl
router.post("/api/getVideoUrl/:catlogId", apiController.getVideoUrl);

//storeCoupon
router.post("/api/storeCoupon/:couponId", apiController.storeCoupon);
router.post("/api/getCoupon", apiController.getCoupon);

//getPayCourse
router.post("/api/getPayCourse/:courseId", apiController.getPayCourse);


//payH
//payA

//getOrders  获得订单管理
router.post("/api/getOrders/:type", apiController.getOrders);
// 获得订单数量  （/api/getOrderNum）
router.post("/api/getOrderNum", apiController.getOrderNum);

// 上传评论图和视频
router.post(
  "/api/upload",
  upload().single("myfile"),
  apiController.upload
);
router.post(
  "/api/delupload",
  apiController.delupload
);
// 添加评论
router.post("/api/comment", apiController.comment);

module.exports = router;
