import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetAppointmentValidator from 'App/Validators/appointment/GetAppointmentValidator'
import UpdateAppointmentValidator from 'App/Validators/appointment/UpdateAppointmentValidator'
import AppointmentsRepository from 'App/Repository/AppointmentsRepository'
import CreateAppointmentValidator from 'App/Validators/appointment/CreateAppointmentValidator'

export default class AppointmentsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { status, email } = await request.validate(GetAppointmentValidator)
      console.log(status, email)
      const appointments = await AppointmentsRepository.getAppointments(status,email)

      return response.status(200).json({
        data: appointments,
        success: true,
        message: 'Appointments fetched successfully!',
      })
    } catch (err) {
      throw Object.assign(err, {
        location: 'AppointmentsController - index',
        success: false,
        message: 'Failed to fetch appointments',
      })
    }
  }


  public async update({ request,response }: HttpContextContract) {
    try {
      const { id, status } = await request.validate(UpdateAppointmentValidator)
      console.log("recieved id and status ", id, status);
      const result = await AppointmentsRepository.updateStatus(id, status)

      return response.status(200).json({
        data: result,
        success: true,
        message: 'Appointment status updated successfully!',
      })
    } catch (err) {
      throw Object.assign(err, {
        location: 'AppointmentsController - update',
        success: false,
        message: 'Failed to update appointment status',
      })
    }
  }

  public async store({request, response} : HttpContextContract) {
    try{
      const { service_id, vehicle_id } = await request.validate(CreateAppointmentValidator);

      const newApp = await AppointmentsRepository.addAppointment(service_id, vehicle_id);

      return response.status(200).json({data:newApp, success:true});
    }catch(err)
    {
      throw Object.assign(err, {
        location: 'AppointmentsController - store ',
        success: false,
        message: 'Failed to add appointment',
      })
    }
  }
}
