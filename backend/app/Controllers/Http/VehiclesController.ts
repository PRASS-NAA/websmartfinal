// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import VehiclesRepository from "App/Repository/VehiclesRepository";
import GetVehicleValidator from "App/Validators/vehicles/GetVehicleValidator";

export default class VehiclesController {

  public async index ({request, response})
  {
    try{
      const { email } = await request.validate(GetVehicleValidator);

      const vehicles = await VehiclesRepository.show(email);

      return response.status(200).json({data:vehicles, success:true})
    }catch(err)
    {
      throw Object.assign({success: false, location: 'vehiclesController - index method'})
    }
  }
}
