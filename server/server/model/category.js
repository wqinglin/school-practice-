module.exports = (sequelize, DataTypes) => {
    const categoryModel = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '分类名称'
        },
        imgurl:{
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '分类图像'
        },
        order: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue:0,
            comment: '排序'
        }

    })
    categoryModel.associate = (models) => {
        categoryModel.hasMany(models.courseModel)
    }
    return categoryModel
}
