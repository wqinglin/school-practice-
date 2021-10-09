module.exports = (sequelize, DataTypes) => {
  const coupon_userModel = sequelize.define("coupon_user", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      comment: "编号",
    },
    /* user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
      comment: "用户编号",
    },
    coupon_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
      comment: "代金劵编号",
    }, */
    is_use: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 0,
      comment: "是否使用",
    }
  });
  // 关联
  return coupon_userModel;
};
