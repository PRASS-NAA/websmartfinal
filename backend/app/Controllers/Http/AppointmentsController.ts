import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetAppointmentValidator from 'App/Validators/appointment/GetAppointmentValidator'
import UpdateAppointmentValidator from 'App/Validators/appointment/UpdateAppointmentValidator'
import AppointmentsRepository from 'App/Repository/AppointmentsRepository'

export default class AppointmentsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { email } = await request.validate(GetAppointmentValidator)
      const appointments = await AppointmentsRepository.getAppointmentsByUserEmail(email)

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

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const { id } = params
      const { status } = await request.validate(UpdateAppointmentValidator)

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
}
