const { User, City, Role } = require("../db/models");

class UserService {
  static async getAllUser() {
    try {
      const user = await User.findAll({
        include: [
          { model: City, as: "city" },
          { model: Role, as: "role" },
        ],
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addUser({
     name,
    email,
    password,
    // phone,
    // verify_status,
    // company_name,
    // company_description,
    // city_id,
     role_id
  }

  ) {
    try {
      const user = await User.create({
         name,
        email,
        password,
        // phone,
        // verify_status,
        // company_name,
        // company_description,
        // city_id,
         role_id,
      });
      console.log(3);
      
      const newUser = await User.findOne({
        where: { id: user.id },
        include: [
          { model: City, as: "city" },
          { model: Role, as: "role" },
        ],
      });
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  //--------------
  static async getOneUser(id) {
    try {
      const user = await User.findByPk({
        where: {
          id,
        },
        include: Role,
        City,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteUser(id) {
    try {
      const countDeletedUser = await User.destroy({
        where: { id },
      });
      return countDeletedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateUser(data, id) {
    try {
      const [countUpdated] = await User.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //--------------------

  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      console.log(user);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserService;
