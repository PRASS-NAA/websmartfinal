import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.patch('/status/:id', 'AppointmentsController.update').middleware(['jwt'])
  Route.get('/', 'AppointmentsController.index').middleware(['jwt'])
  Route.post('/','AppointmentsController.store').middleware(['jwt'])
}).prefix('/appointments')
