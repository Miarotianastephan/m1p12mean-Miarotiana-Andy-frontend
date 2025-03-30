interface Appointment {
  _id: string;
  dateBegin: Date;
  dateFin: Date;
  isAccepted: boolean;
}

export interface AppointmentDate {
  idrepair: string;
  daterdv: Date;
  appointments: Appointment[];
}
