import Service from "App/Models/Service";

export default class ServicesRepository
{
  public static async showServices()
  {
    return Service.all();
  }

  public static async addService(payload)
  {
    const newService = await Service.create({
      name: payload.name,
      price: payload.price,
      description: payload.description
    })

    return newService
  }
}
