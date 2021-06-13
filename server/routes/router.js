const express = require("express");

//i am not gone a create new app
// const app=express(); //wrong

//create a route in new folder with the help of express.Router()

const route = express.Router();

//mantaine callback function of every routes

const services = require("../services/render");

//controller

const controller = require("../controller/controller");

/**
 * @description Root Route
 * @method GET/
 */
route.get("/", services.homeRoutes);

/**
 * @description for add_user
 * @method GET/add_user
 */
route.get("/add-user", services.add_user);
/**
 * @description for update_user
 * @method GET/update_user
 */
route.get("/update-user", services.update_user);

// -------------API---------------

route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
