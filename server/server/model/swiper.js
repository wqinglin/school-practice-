module.exports = (sequelize, DataTypes) => {
    const swiperModel = sequelize.define('swiper', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '名称'
        },
        url:{
             type: DataTypes.STRING(50),
            allowNull: false,
            comment: '连接'
        },
        imgurl:{
             type: DataTypes.STRING(100),
            allowNull: false,
            comment: '轮播图像'
        },
        order: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue:0,
            comment: '排序'
        }

    })
  
    return swiperModel
}
