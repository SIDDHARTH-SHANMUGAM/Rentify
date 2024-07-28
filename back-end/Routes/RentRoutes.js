const express = require("express");
const rentRouter = express.Router();
const {authUser} = require('../middleware/AuthUser');
const {addRent, getRents, getMyRents, deletemyrents, updateRent} = require('../Controllers/RentController')


// get
rentRouter.route('/getrents').get( getRents);


// post
rentRouter.route('/addrent').post(authUser, addRent);
rentRouter.route('/getmyrents').post(authUser, getMyRents);
rentRouter.route('/deletemyrent').post(authUser, deletemyrents);
rentRouter.route('/updatemyrent').post(authUser, updateRent);



module.exports = rentRouter;