module.exports = (sequelize, DataTypes) => {
  const courseModel = sequelize.define("course", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      comment: "编号",
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "课程标题",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "课程内容介绍",
    },
    imgurl: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "课程封面",
    },
    readCount: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
      comment: "购买人数",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      comment: "打折价格",
    },
    ori_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      comment: "原价",
    },
    is_special: {
      type: DataTypes.INTEGER(3),
      defaultValue: 0,
      comment: "推荐课程",
    },
    is_on: {
      type: DataTypes.INTEGER(3),
      defaultValue: 1,
      comment: "上架或下架",
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "排序",
    },
  });
  // 关联
  courseModel.associate = models => {
    courseModel.belongsTo(models.categoryModel);
    courseModel.hasMany(models.catlogModel);
  };
  return courseModel;
};
