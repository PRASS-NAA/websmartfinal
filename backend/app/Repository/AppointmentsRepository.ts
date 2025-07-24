import Database from '@ioc:Adonis/Lucid/Database'
import Appointment from 'App/Models/Appointment'
import User from 'App/Models/User'
import Vehicle from 'App/Models/Vehicle'
import OtpService from 'App/Services/otpService'

export default class AppointmentsRepository {
  public static async getAppointmentsByUserEmail(email?: string) {
    if (email) {
      const user = await User.findByOrFail('email', email)

      return Database
        .from('appointments')
        .join('vehicles', 'appointments.vehicle_id', 'vehicles.id')
        .join('services', 'appointments.service_id', 'services.id')
        .where('vehicles.owner_id', user.id)
        .select(
          'appointments.id',
          'appointments.booking_date',
          'appointments.status',
          'appointments.vehicle_id',
          'appointments.technician_id',
          'services.name as service_name'
        )
    } else {
      return Database
        .from('appointments')
        .join('vehicles', 'appointments.vehicle_id', 'vehicles.id')
        .join('services', 'appointments.service_id', 'services.id')
        .select(
          'appointments.id',
          'appointments.booking_date',
          'appointments.status',
          'appointments.vehicle_id',
          'appointments.technician_id',
          'services.name as service_name'
        )
    }
  }

  public static async updateStatus(id: number, newStatus: string) {
    const appointment = await Appointment.findOrFail(id)

    appointment.status = newStatus
    await appointment.save()

    const vehicle = await Vehicle.findOrFail(appointment.vehicleId)
    const user = await User.findOrFail(vehicle.oId)

    const mailService = new OtpService()
    await mailService.sendStatusEmail(user.email, newStatus)

    return {
      success: true,
      message: 'Appointment status updated and email sent',
      appointment,
    }
  }
}
