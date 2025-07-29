import Database from '@ioc:Adonis/Lucid/Database'
import Appointment from 'App/Models/Appointment'
import Service from 'App/Models/Service'
import User from 'App/Models/User'
import Vehicle from 'App/Models/Vehicle'
import OtpService from 'App/Services/otpService'
import pdfKit from 'pdfkit';
import fs from 'fs';
import path from 'path'

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

  public static async getPDF(id)
  {
    try{
      const appointmentData = await Database
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
        'services.name as service_name',
        'vehicles.company',
        'vehicles.model_name',
        'users.email as user_email',
      )
    .where('appointments.id', id)
    .first();

    //now pdf

    const doc = new pdfKit()
    const fileName = path.join(__dirname, `../../../backend/public/Invoices/invoice_${appointmentData.id}.pdf`)
    const writeStream = fs.createWriteStream(fileName)

    doc.pipe(writeStream)

    doc.fontSize(25).text(" Service Invoice ");
    doc.moveDown();
    doc.fontSize(19).text("Prass Store ");
    doc.moveDown();


    doc.text(`Email: ${appointmentData.user_email}`);
    doc.text(`Service: ${appointmentData.service_name}`);
    doc.text(`Status: ${appointmentData.status}`);
    doc.text(`Booking Date: ${appointmentData.booking_date}`);
    doc.text(`Vehicle ID: ${appointmentData.vehicle_id}`);
    doc.text(`Vehicle Company: ${appointmentData.company}`);
    doc.text(`Vehicle Model: ${appointmentData.model_name}`);
    doc.text(`Technician ID: ${appointmentData.technician_id}`);

    doc.end();

    return appointmentData;

    }catch(err)
    {
      throw err;
    }


  }
}
