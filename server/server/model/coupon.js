const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const couponModel = sequelize.define("coupon", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      comment: "编号",
    },
    coupon_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "优惠卷名",
    },
    coupon_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      comment: "金额",
    },
    total_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      comment: "满多少可用",
    },
    from_time: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "开始时间",
    },
    to_time: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "结束时间"
    },
    is_on: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 1,
      comment: "上架下架",
    },
  });
  // 关联
  couponModel.associate = (models) => {
    couponModel.belongsToMany(models.userModel, { through: "coupon_user" });
  };
 
  return couponModel;
};
