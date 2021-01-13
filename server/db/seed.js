const db = require("./index");
const UserModel = require("../app/models/User")

db.query("TRUNCATE TABLE users");

//    .then( () => {
//       db.query('CREATE TABLE users (ID SERIAL PRIMARY KEY, username VARCHAR(500), password VARCHAR(500))')
//    })
//    .then( () => {
//       UserModel.newUser({ username: "BooSqua", password: "password" })
//    }).catch(err => {
//       console.log(err)
//    });
// CREATE TABLE albums ( ID SERIAL PRIMARY KEY, title VARCHAR, ownerId INTEGER, public BOOLEAN);

UserModel.newUser({ username: "BooSqua", password: "password" });
// db.query( createTestTable )
//  CREATE TABLE images (                                                 ID SERIAL PRIMARY KEY,                                                          albumId INTEGER,                                                                path VARCHAR);