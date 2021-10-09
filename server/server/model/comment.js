const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const commentModel = sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      comment: "编号",
    },
    course_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      comment: "课程编号",
    },
    rate: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 1,
      comment: "评分",
    },
    anonymous: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      comment: "是否匿名",
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "课程内容",
    },
    imgurls: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: "",
      comment: "图像",
    },
    video_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
      comment: "视频",
    }
  });
  // 关联
  commentModel.associate = (models) => {
    commentModel.belongsTo(models.userModel);
  };

  return commentModel;
};
