module.exports = (sequelize, DataTypes) => {
  const userModel = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "用户名",
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "密码",
    },
    mobile: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "手机号",
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: "昵称",
    },
    gender: {
      type: DataTypes.ENUM("男", "女", "保密"),
      allowNull: false,
      defaultValue: "男",
      comment: "头像",
    },
    avatar: {
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue:
        "http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg",
      comment: "头像",
    },
    count_nopay: { type: DataTypes.INTEGER(3), defaultValue: 0 }, // 待付款
    count_notransfer: { type: DataTypes.INTEGER(3), defaultValue: 0 }, // 待发货
    count_noconfirm: { type: DataTypes.INTEGER(3), defaultValue: 0 }, // 待收货
    count_nocomment: { type: DataTypes.INTEGER(3), defaultValue: 0 }, // 待评价
  });
  // 关联
   userModel.associate = (models) => {
   userModel.belongsToMany(models.couponModel, { through: "coupon_user" });
  };
  return userModel;
};