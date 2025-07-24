// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ServicesRepository from "App/Repository/ServicesRepository"
import AddserviceValidator from "App/Validators/services/AddserviceValidator";

export default class ServicesController {

  public async index ({response})
  {
    try{
      const services = await ServicesRepository.showServices();

      return response.status(200).json({data:services, success:true})
    }catch(err)
    {
      throw Object.assign(err, { location: 'ServicesController - index', success: false });
    }
  }

  public async store ({request, response}){
    try{
      const payload = await request.validate(AddserviceValidator);

      const serv = await ServicesRepository.addService(payload);

      return response.status(200).json({data:serv, success:true})
    }catch(err)
    {
      throw Object.assign(err, { location: 'ServicesController - store', success: false });
    }
  }
}
