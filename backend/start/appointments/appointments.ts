import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.patch('/status/:id', 'AppointmentsController.update')
  Route.get('/', 'AppointmentsController.index')
}).prefix('/appointments')
