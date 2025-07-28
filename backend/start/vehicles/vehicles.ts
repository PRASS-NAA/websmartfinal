import Route from '@ioc:Adonis/Core/Route';

Route.group(() =>
{
  Route.get('/','VehiclesController.index')
}).prefix('/vehicles')
