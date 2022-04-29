module.exports = (sequelize, DataTypes) => {
  const Posts2 = sequelize.define(
    "Posts2",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
      lien: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Posts2",
    }
  );

  /* const Posts2 = sequelize.define("Posts2", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    lien: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    {define:{freezeTableName:true}},
  }); */

  Posts2.associate = (models) => {
    //un poste à plusieurs commentaires et plusieurs likes
    Posts2.hasMany(models.Comments2, {
      onDelete: "cascade",
    });

    Posts2.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };
  return Posts2;
};
