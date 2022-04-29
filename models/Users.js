module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      /*    validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      }, */
    },

    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValues: false,
    }, //Profs
    prof: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValues: false,
    },

    photo_profil: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "profil.png",
    },
  });

  Users.associate = (models) => {
    //un user à plusieurs postes et plusieurs likes
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
    Users.hasMany(models.Posts2, {
      onDelete: "cascade",
    });

    /*  Users.hasMany(models.Comments, {
      //ajout
      onDelete: "cascade",
    }); */
  };

  return Users;
};
