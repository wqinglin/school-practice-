module.exports = (sequelize, DataTypes) => {
  const course_orderModel = sequelize.define("course_order", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      comment: "编号",
    },
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      comment: "编号",
    },
    user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: 0,
      comment: "用户编号",
    },
    // course_id: {
    //   type: DataTypes.INTEGER(10),
    //   allowNull: false,
    //   defaultValue: 0,
    //   comment: "课程编号",
    // },
    order_no: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "订单号",
    },
    coupon_id: {
      type: DataTypes.INTEGER(10),
      comment: "代金劵编号",
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "支付总价",
    },
    is_pay: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0,
      comment: "是否支付",
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
      comment: "创建时间",
    },
    is_comment: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: 1,
      comment: "是否评论", // 订单状态：  1 待付款  2 已付款,待发货   3待收货  4待评价  5、交易成功
    },
  });
  // 关联
  course_orderModel.associate = (models) => {
    course_orderModel.belongsTo(models.courseModel);
  };
  return course_orderModel;
};
