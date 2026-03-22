/**
 * Placeholder for appointment logic
 */

export interface AppointmentService {
  create(animalId: string, startTime: Date, endTime: Date, type: string): Promise<string>;
  list(animalId: string): Promise<any[]>;
  cancel(appointmentId: string): Promise<void>;
}
