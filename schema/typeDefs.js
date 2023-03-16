//USING #graphql AT THE BEGINNING HIGHLIGHT THE GRAPHQL SYNTAX
//A SCHEMA IS A COLLECTION OF TYPE DEFINITIONS, DEFINING THE SHAPE OF QUERIES
const typeDefs = `#graphql
  #DEFINE USER TYPE
  type User{
  id:ID!
  name:String! #Use the enum here to validate the value for name
  age:Int!
  height:Float!
  friends:[User]
  likedmovies:[Movie]
  }

  type Movie{
  id:ID!
  name:String!
  }

  #DEFINE QUERY TYPE
  type Query{
  #USERS
  users:[User!]!
  #USER
  user(id:ID!):User!
  #MOVIES
  movies:[Movie!]!
  }

 #DEFINE AN INPUT FOR NEW USER TO DEFINE THE TYPE OF USER INPUT DATA THAT IS SENT FROM THE FRONTEND
 input userInput{
  name:String = simon4 #Set the default name in case there is no name provided
  age:Int = 18
  height:Float = 170
 }

input userUpdateInput{
  name:String
  age:Int
  height:Float
}

input deleteUser{
id:ID!
}

 #DEFINE MUTATION TYPE
 type Mutation{
 #INSERT USER
 insertUser(input:userInput!):User!
 #UPDATE USER
 updateUser(id:ID!,input:userUpdateInput!):User!
 #DELETE USER
 deleteUser(id:ID!):User!
 }

 #ENUM FOR NAME
enum Name{
simon
simon2
simon3
simon4
}
`;

module.exports = { typeDefs };
