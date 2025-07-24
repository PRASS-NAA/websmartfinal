import Route from "@ioc:Adonis/Core/Route";

// user routes

Route.group(() => {
  Route.get('/', 'UsersController.index').middleware(['jwt']) // for fetching all or by email
  Route.post("/login", 'UsersController.login')
  Route.post("/send-otp", 'UsersController.sendOtp')
  Route.post("/verify-otp", 'UsersController.verifyOtp')
}).prefix('/users')

