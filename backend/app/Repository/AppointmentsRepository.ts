import Database from '@ioc:Adonis/Lucid/Database'
import Appointment from 'App/Models/Appointment'
import Service from 'App/Models/Service'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Vehicle from 'App/Models/Vehicle'
import OtpService from 'App/Services/otpService'

export default class AppointmentsRepository {
  public static async getAppointments(status,email) {
    if (status && !email) {
      console.log("status invoked")
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
        ).where('status',status)

    } else if(!status && !email){
      console.log("status not invoked")
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
    } else{
      console.log("email invoked");
      return Database
        .from('appointments')
        .join('services', 'appointments.service_id', 'services.id')
        .join('vehicles','appointments.vehicle_id', 'vehicles.id')
        .join('users','vehicles.o_id','users.id')
        .select(
          'appointments.id',
          'appointments.booking_date',
          'appointments.status',
          'appointments.vehicle_id',
          'appointments.technician_id',
          'services.name as service_name'
        ).where('email',email)
    }
  }

  public static async updateStatus(id: number, newStatus: string) {
    const appointment = await Appointment.findOrFail(id)

    appointment.status = newStatus
    await appointment.save()

    console.log(appointment);
    const vehicle = await Vehicle.findOrFail(appointment.vehicleId)

    console.log(vehicle);
    const user = await User.findOrFail(vehicle.$attributes.oId)
    console.log(user);

    const mailService = new OtpService()
    await mailService.sendStatusEmail(user.email, newStatus)

    return {
      success: true,
      message: `Appointment status updated and email sent`,
      appointment,
    }
  }

  public static async addAppointment(service_id,vehicle_id)
  {
    try{

      const service = await Service.findOrFail(service_id);

      const technician_id = service.technicianId;

      console.log(technician_id);
      const newApp = await Appointment.create({
        serviceId: service_id,
        bookingDate: new Date(),
        vehicleId: vehicle_id,
        technicianId: technician_id,
        status: 'pending'
      })

      return newApp;
    }catch(err)
    {
      throw err;
    }
  }
}
