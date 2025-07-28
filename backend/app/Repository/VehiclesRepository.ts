import Vehicle from "App/Models/Vehicle";
import User from "App/Models/User";

export default class VehiclesRepository {
  public static async show(email)
  {
    //first find user id

    try{
      const owner = await User.findByOrFail('email',email);

      const owner_id = owner.id;

      console.log(owner_id);
      //gave only the forst matching record
      //const vehicles = await Vehicle.findBy('o_id',owner_id);
      const vehicles = await Vehicle.query().where('o_id', owner_id);



      return vehicles;
    }catch(err)
    {
      throw err;
    }
  }
}
