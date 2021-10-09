module.exports = (sequelize, DataTypes) => {
  const catlogModel = sequelize.define("catlog", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      comment: "目录编号",
    },
    catlog_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "目录标题",
    },
    pid: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
      comment: "目录父",
    },
    is_free: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 0,
      comment: "是否免费",
    },
    video_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      comment: "目录节视频",
    },
  });
  // 关联
  catlogModel.associate = (models) => {
    catlogModel.belongsTo(models.courseModel);
  };
  return catlogModel;
};
