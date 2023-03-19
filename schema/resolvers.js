const fs = require("fs");
//FUNCTION TO GET USER DATA
const loadUsers = function () {
  const data = JSON.parse(fs.readFileSync("./fakeData.json", "utf-8"));
  return data;
};

const updateUsers = (users) => {
  fs.writeFileSync("./fakeData.json", JSON.stringify(users));
};

const loadMovies = function () {
  const data = JSON.parse(fs.readFileSync("./movieData.json", "utf-8"));
  return data;
};

const resolvers = {
  //RESOLVERS FOR QUERY TYPES
  Query: {
    //FUNCTION TO RETURN USERS
    users: (parent, args, contextValue) => {
      const userArr = null;
      if (userArr) {
        return { users: userArr };
      }
      return { message: "The users do not exist" };
    },
    //FUNCTION TO RETURN A USER BASED ON USER ID
    //ARGS HELPS ACCESS THE ID FROM THE API REQUEST
    user: (parent, args) => {
      const id = Number(args.id);
      const dataArr = loadUsers();
      //USE UNDERSCORE FROM LODASH LIBRARY TO RETURN A USER BASED ON ID
      const userData = dataArr.find((user) => user.id === id); //SINCE THE ID PASSED DOWN THROUGH THE ARGS IS CONVERTED TO A STRING SO WE NEED TO CONVERT IT BACK TO NUMBER
      return userData;
    },
  },

  //RESOLVER TO RETURN THE VALUE FOR USERRESULT UNION
  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return "UsersResultValid";
      }
      if (obj.message) {
        return "UsersResultError";
      }
      return null;
    },
  },
  //RESOLVERS FOR THE USER TYPE
  //WE CAN CHANGE THE RETURNED VALUE FOR CERTAIN FIELDS IN TYPES
  User: {
    //FUNCTION TO CONVERT THE MOVIE IDS ARRAY TO MOVIES IN THE USER TYPE
    likedmovies: (parent, args) => {
      const movieArr = loadMovies();
      const userArr = loadUsers();
      //GET ID FROM THE USER TYPE
      const userId = parent.id;
      const foundUser = userArr.find((user) => user.id === userId);
      if (foundUser.moviesIdArr) {
        const idArr = foundUser.moviesIdArr;
        //RETURN MOVIES THAT A USER LIKES
        return movieArr.filter((movie) => idArr.includes(movie.id));
      }
      if (!foundUser.moviesIdArr) {
        return null;
      }
    },
  },

  //RESOLVERS FOR MUTATION
  Mutation: {
    //FUNCTION TO INSERT A NEW USER
    insertUser: (parent, args) => {
      //GET USERS ARRAY
      const usersArr = loadUsers();
      //GET NEW USER FROM ARGS
      const newUser = args.input;
      //CREATE A NEW ID FOR THE NEW USER
      newUser.id = usersArr[usersArr.length - 1].id + 1;
      //CREATE A NEW USERS ARRAY
      const newUsersArr = [...usersArr, newUser];
      //REWRITE THE FAKEDATA JSON FILE
      updateUsers(newUsersArr);
      return newUser;
    },

    //FUNCTION TO UPDATE A USER
    updateUser: (parent, args) => {
      const usersArr = loadUsers();
      const newUser = args.input;
      const userId = Number(args.id);
      const newUserArr = usersArr.map((user) => {
        if (user.id === userId) {
          user = { ...user, ...newUser };
        }
        return user;
      });
      updateUsers(newUserArr);
      const updatedUser = newUserArr.find((user) => user.id === userId);
      return updatedUser;
    },

    //FUNCTION TO DELETE USER
    deleteUser: (parent, args) => {
      const userArr = loadUsers();
      const deleteId = Number(args.id);
      const newUserArr = userArr.filter((user) => user.id !== deleteId);
      updateUsers(newUserArr);
      return userArr.find((user) => user.id === deleteId);
    },
  },
};

module.exports = { resolvers };
