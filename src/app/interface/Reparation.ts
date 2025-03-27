interface IMechanic {
  name: string;
  email: string;
  phone?: string;
  skills: {
    categoryId: string;
    categoryName: string;
  }[];
}

interface IRepairProgression {
  categoryid: string;
  subcategory: string;
  subcategoryname: string;
  status: 'completed' | 'in-progress';
  subacategorystartdate?: Date | null;
  subacategoryenddate?: Date | null;
}

export interface Reparation {
  _id: string;
  userid: string;
  problemid: string;
  carid: string;
  nameuser: string;
  repairstartdate?: Date | null;
  repairenddate?: Date | null;
  final_status: 'completed' | 'in-progress';
  status_creneaux: 'creneaux att' | 'creneaux dispo' | 'en reparation';
  repairCost: number;
  repair: IRepairProgression[];
  mechanics: IMechanic[];
  createdAt?: Date;
  updatedAt?: Date;
  description_problem: string;
  estimationtime: number;
  marquecar: string;
  modelcar: string;
  yearcar: string;
}
