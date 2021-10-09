/*
 Navicat Premium Data Transfer

 Source Server         : wql
 Source Server Type    : MySQL
 Source Server Version : 50709
 Source Host           : localhost:3306
 Source Schema         : aa

 Target Server Type    : MySQL
 Target Server Version : 50709
 File Encoding         : 65001

 Date: 09/10/2021 16:50:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `auth` tinyint(1) NULL DEFAULT 0 COMMENT '用户权限',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 0, '2021-10-09 11:11:58', '2021-10-09 11:12:00');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '分类名称',
  `imgurl` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '分类图像',
  `order` int(10) NOT NULL DEFAULT 0 COMMENT '排序',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Java', '1633762773437860200.jpg', 0, '2021-09-05 10:51:27', '2021-10-09 06:59:33');
INSERT INTO `category` VALUES (3, 'Css', '1633762843195253913.jpg', 0, '2021-10-09 05:21:17', '2021-10-09 07:00:43');
INSERT INTO `category` VALUES (4, 'React', '1633763299239651096.jpg', 0, '2021-10-09 05:21:28', '2021-10-09 07:09:49');
INSERT INTO `category` VALUES (6, 'Java', '1633763910314071916.jpg', 0, '2021-10-09 07:18:30', '2021-10-09 07:18:30');

-- ----------------------------
-- Table structure for catlog
-- ----------------------------
DROP TABLE IF EXISTS `catlog`;
CREATE TABLE `catlog`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '目录编号',
  `catlog_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '目录标题',
  `pid` int(10) NOT NULL DEFAULT 0 COMMENT '目录父',
  `is_free` int(3) NOT NULL DEFAULT 0 COMMENT '是否免费',
  `video_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '目录节视频',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `courseId`(`courseId`) USING BTREE,
  CONSTRAINT `catlog_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of catlog
-- ----------------------------
INSERT INTO `catlog` VALUES (1, '第一章', 0, 0, '', '2021-09-05 11:11:52', '2021-09-05 11:11:52', NULL);
INSERT INTO `catlog` VALUES (2, '第一节', 1, 1, '1630840325495761822.ico', '2021-09-05 11:12:05', '2021-09-05 11:12:05', NULL);
INSERT INTO `catlog` VALUES (3, '第一章', 0, 0, '', '2021-10-09 03:48:49', '2021-10-09 03:48:49', NULL);
INSERT INTO `catlog` VALUES (4, '第一节', 3, 1, '1633751486527297533.mp4', '2021-10-09 03:51:26', '2021-10-09 03:51:26', NULL);
INSERT INTO `catlog` VALUES (5, '第一章', 0, 0, '', '2021-10-09 03:53:37', '2021-10-09 03:53:37', NULL);
INSERT INTO `catlog` VALUES (6, '第一节', 3, 0, '1633751637822302772.mp4', '2021-10-09 03:53:58', '2021-10-09 03:53:58', NULL);
INSERT INTO `catlog` VALUES (7, '第一章', 0, 0, '', '2021-10-09 03:58:02', '2021-10-09 03:58:02', NULL);
INSERT INTO `catlog` VALUES (8, '第一节', 7, 1, '1633751893801727510.mp4', '2021-10-09 03:58:14', '2021-10-09 03:58:14', NULL);
INSERT INTO `catlog` VALUES (9, '第二节', 7, 0, '1633754933177414367.mp4', '2021-10-09 04:48:53', '2021-10-09 04:48:53', NULL);
INSERT INTO `catlog` VALUES (10, '第三节', 1, 1, '1633754956811091583.mp4', '2021-10-09 04:49:17', '2021-10-09 04:49:17', NULL);
INSERT INTO `catlog` VALUES (11, '第三节', 7, 1, '1633755040165421953.mp4', '2021-10-09 04:50:40', '2021-10-09 04:50:40', NULL);
INSERT INTO `catlog` VALUES (12, '第一章', 0, 0, '', '2021-10-09 05:27:51', '2021-10-09 05:27:51', NULL);
INSERT INTO `catlog` VALUES (13, '第一节', 12, 1, '1633757290806475183.mp4', '2021-10-09 05:28:10', '2021-10-09 05:28:10', NULL);
INSERT INTO `catlog` VALUES (14, '第一章', 0, 0, '', '2021-10-09 07:37:25', '2021-10-09 07:37:25', 6);
INSERT INTO `catlog` VALUES (15, '第一节', 14, 1, '1633765064249375721.mp4', '2021-10-09 07:37:44', '2021-10-09 07:37:44', 6);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `course_id` int(10) NOT NULL COMMENT '课程编号',
  `rate` int(3) NOT NULL DEFAULT 1 COMMENT '评分',
  `anonymous` int(3) NOT NULL COMMENT '是否匿名',
  `content` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '课程内容',
  `imgurls` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '图像',
  `video_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '视频',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 4, 5, 0, '121231', 'http://localhost:3000/upload/1633756012652239880.png', '', '2021-10-09 05:06:53', '2021-10-09 05:06:53', 3);
INSERT INTO `comment` VALUES (2, 4, 5, 0, '172732573', 'http://localhost:3000/upload/1633756264614345220.png', '', '2021-10-09 05:11:05', '2021-10-09 05:11:05', 4);

-- ----------------------------
-- Table structure for coupon
-- ----------------------------
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `coupon_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '优惠卷名',
  `coupon_fee` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '金额',
  `total_fee` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '满多少可用',
  `from_time` bigint(20) NOT NULL COMMENT '开始时间',
  `to_time` bigint(20) NOT NULL COMMENT '结束时间',
  `is_on` int(3) NOT NULL DEFAULT 1 COMMENT '上架下架',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of coupon
-- ----------------------------
INSERT INTO `coupon` VALUES (1, '水果', 100.00, 200.00, 1630540800000, 1633910400000, 1, '2021-09-05 11:12:15', '2021-09-05 11:12:15');
INSERT INTO `coupon` VALUES (2, '535345', 54353.00, 45.00, 1630454400000, 1631836800000, 1, '2021-09-05 13:41:31', '2021-09-05 13:41:31');

-- ----------------------------
-- Table structure for coupon_user
-- ----------------------------
DROP TABLE IF EXISTS `coupon_user`;
CREATE TABLE `coupon_user`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `is_use` int(3) NOT NULL DEFAULT 0 COMMENT '是否使用',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `couponId` int(10) NULL DEFAULT NULL,
  `userId` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `coupon_user_userId_couponId_unique`(`couponId`, `userId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `coupon_user_ibfk_1` FOREIGN KEY (`couponId`) REFERENCES `coupon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `coupon_user_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of coupon_user
-- ----------------------------
INSERT INTO `coupon_user` VALUES (1, 0, '2021-10-09 03:51:50', '2021-10-09 03:51:50', 1, 2);
INSERT INTO `coupon_user` VALUES (2, 0, '2021-10-09 04:58:25', '2021-10-09 04:58:25', 1, 3);
INSERT INTO `coupon_user` VALUES (3, 0, '2021-10-09 05:07:47', '2021-10-09 05:07:47', 1, 4);
INSERT INTO `coupon_user` VALUES (4, 0, '2021-10-09 06:35:53', '2021-10-09 06:35:53', 1, 5);
INSERT INTO `coupon_user` VALUES (5, 0, '2021-10-09 07:43:03', '2021-10-09 07:43:03', 1, 6);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '课程标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '课程内容介绍',
  `imgurl` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '课程封面',
  `readCount` int(10) NULL DEFAULT 0 COMMENT '购买人数',
  `price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '打折价格',
  `ori_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '原价',
  `is_special` int(3) NULL DEFAULT 0 COMMENT '推荐课程',
  `is_on` int(3) NULL DEFAULT 1 COMMENT '上架或下架',
  `order` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `categoryId`(`categoryId`) USING BTREE,
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (6, '项目初体验', '<p><img src=\"/upload/ueditor/image/20211009/1624346197659.jpg\" title=\"1624346197659.jpg\" alt=\"1624346197659.jpg\" width=\"358\" height=\"230\"/></p>', '1633765038357807868.png', 10, 399.00, 599.00, 1, 1, 0, '2021-10-09 07:37:18', '2021-10-09 08:17:28', 4);
INSERT INTO `course` VALUES (7, '认识Java', '<p></p><p><img src=\"/upload/ueditor/image/20211009/1625202479710.jpg\" title=\"1625202479710.jpg\"/></p><p></p><p><br/></p>', '1633765307749915936.png', 10, 299.00, 399.00, 1, 1, 0, '2021-10-09 07:41:47', '2021-10-09 07:41:47', 1);
INSERT INTO `course` VALUES (8, '不一样的react', '<p><img src=\"/upload/ueditor/image/20211009/1625201654655.jpg\" width=\"358\" height=\"228\"/><br/></p><p><br/></p>', '1633765624069857555.jpg', 2, 345.00, 545.00, 1, 1, 0, '2021-10-09 07:47:04', '2021-10-09 08:15:09', 4);
INSERT INTO `course` VALUES (9, '盒模型', '<p><img src=\"/upload/ueditor/image/20211009/1624346237771.png\" title=\"1624346237771.png\" alt=\"1624346237771.png\" width=\"354\" height=\"234\"/></p>', '1633766488558539894.png', 3, 99.00, 199.00, 1, 1, 0, '2021-10-09 08:01:28', '2021-10-09 08:14:21', NULL);
INSERT INTO `course` VALUES (10, '小白学java', '<p><img src=\"/upload/ueditor/image/20211009/1624346037916.jpg\" title=\"1624346037916.jpg\" alt=\"1624346037916.jpg\"/></p>', '1633769225865053559.png', 10, 266.00, 399.00, 1, 1, 0, '2021-10-09 08:47:05', '2021-10-09 08:47:05', 1);

-- ----------------------------
-- Table structure for course_order
-- ----------------------------
DROP TABLE IF EXISTS `course_order`;
CREATE TABLE `course_order`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` int(10) NOT NULL DEFAULT 0 COMMENT '用户编号',
  `order_no` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '订单号',
  `coupon_id` int(10) NULL DEFAULT NULL COMMENT '代金劵编号',
  `fee` decimal(10, 2) NOT NULL COMMENT '支付总价',
  `is_pay` int(4) NOT NULL DEFAULT 0 COMMENT '是否支付',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `is_comment` int(3) NOT NULL DEFAULT 1 COMMENT '是否评论',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `courseId`(`courseId`) USING BTREE,
  CONSTRAINT `course_order_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of course_order
-- ----------------------------
INSERT INTO `course_order` VALUES (12, 3, '1633755658528', 0, 15.00, 1, 0, 5, '2021-10-09 05:00:58', '2021-10-09 05:06:53', NULL);
INSERT INTO `course_order` VALUES (13, 3, '1633755741513', 0, 15.00, 0, 0, 3, '2021-10-09 05:02:21', '2021-10-09 05:02:21', NULL);
INSERT INTO `course_order` VALUES (14, 4, '1633756070684', 0, 15.00, 0, 0, 5, '2021-10-09 05:07:50', '2021-10-09 05:07:50', NULL);
INSERT INTO `course_order` VALUES (15, 4, '1633756144454', 0, 15.00, 0, 0, 1, '2021-10-09 05:09:04', '2021-10-09 05:09:04', NULL);
INSERT INTO `course_order` VALUES (16, 4, '1633756168271', 0, 15.00, 0, 0, 1, '2021-10-09 05:09:28', '2021-10-09 05:09:28', NULL);
INSERT INTO `course_order` VALUES (17, 4, '1633756211602', 0, 15.00, 0, 0, 5, '2021-10-09 05:10:11', '2021-10-09 05:11:05', NULL);
INSERT INTO `course_order` VALUES (18, 4, '1633760297885', 0, 123.00, 0, 0, 1, '2021-10-09 06:18:17', '2021-10-09 06:18:17', NULL);
INSERT INTO `course_order` VALUES (19, 5, '1633761355903', 0, 15.00, 0, 0, 1, '2021-10-09 06:35:55', '2021-10-09 06:35:55', NULL);
INSERT INTO `course_order` VALUES (20, 5, '1633764011727', 0, 15.00, 0, 0, 1, '2021-10-09 07:20:11', '2021-10-09 07:20:11', NULL);
INSERT INTO `course_order` VALUES (21, 6, '1633766360393', 1, 245.00, 0, 0, 4, '2021-10-09 07:59:20', '2021-10-09 07:59:20', 8);

-- ----------------------------
-- Table structure for swiper
-- ----------------------------
DROP TABLE IF EXISTS `swiper`;
CREATE TABLE `swiper`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '名称',
  `url` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '连接',
  `imgurl` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '轮播图像',
  `order` int(10) NOT NULL DEFAULT 0 COMMENT '排序',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of swiper
-- ----------------------------
INSERT INTO `swiper` VALUES (4, '1', '', '1633762645672305617.png', 0, '2021-10-09 06:57:25', '2021-10-09 06:57:25');
INSERT INTO `swiper` VALUES (5, '2', '', '1633762697153861828.png', 0, '2021-10-09 06:58:17', '2021-10-09 06:58:17');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `mobile` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '手机号',
  `nickname` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '昵称',
  `gender` enum('男','女','保密') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '男' COMMENT '头像',
  `avatar` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg' COMMENT '头像',
  `count_nopay` int(3) NULL DEFAULT 0,
  `count_notransfer` int(3) NULL DEFAULT 0,
  `count_noconfirm` int(3) NULL DEFAULT 0,
  `count_nocomment` int(3) NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '6448xyz', '09173f02064db85efbbf5e4650f3d44d', '12345', NULL, '男', 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg', 0, 0, 0, 0, '2021-10-05 13:25:09', '2021-10-05 13:25:09');
INSERT INTO `user` VALUES (2, '7079xyz', 'b53086d558f1127993271e8c504ded45', '123456', NULL, '男', 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg', 0, 0, 0, 0, '2021-10-09 03:08:57', '2021-10-09 03:08:57');
INSERT INTO `user` VALUES (3, '6201xyz', 'fe7ecc4de28b2c83c016b5c6c2acd826', '2442', NULL, '男', 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg', 0, 0, 0, -1, '2021-10-09 04:54:01', '2021-10-09 05:06:53');
INSERT INTO `user` VALUES (4, '4520xyz', 'f09696910bdd874a99cd74c8f05b5c44', '12123', NULL, '男', 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg', 0, 0, 0, -1, '2021-10-09 05:07:35', '2021-10-09 05:11:05');
INSERT INTO `user` VALUES (5, '7603xyz', '65a54865de989d0a6a60a8ad5b07e071', '12345231', NULL, '男', 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg', 0, 0, 0, 0, '2021-10-09 06:34:16', '2021-10-09 06:34:16');
INSERT INTO `user` VALUES (6, '9932xyz', '6e2713a6efee97bacb63e52c54f0ada0', '87257878', NULL, '男', 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg', 0, 0, 0, 0, '2021-10-09 07:42:00', '2021-10-09 07:42:00');

SET FOREIGN_KEY_CHECKS = 1;
