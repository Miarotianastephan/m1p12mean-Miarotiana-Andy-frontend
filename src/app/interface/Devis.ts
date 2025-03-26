interface QuotationDetail {
  partid: string; // ObjectId reference to Part
  partname: string;
  quantite: number;
  price: number;
}

interface RepairSubCategory {
  subcategoryid: string; // ObjectId reference to SubCategory
  categoryid: string; // ObjectId reference to Category
  subcategoryname: string;
  estimatedtime: number;
  estimatedprice: number;
  nbrepair: number;
  description: string;
  complexity: 1 | 2 | 3; // Complexity can be 1, 2, or 3
}
interface Commentaire {
  providerClient: Boolean;
  comment: String;
  datecomment: Date;
}
export interface Quote {
  _id: string;
  problemid: string; // ObjectId reference to ProblemReport
  userid: string; // ObjectId reference to User
  nameuser: string;
  carid: string; // ObjectId reference to Car
  marquecar: String;
  modelcar: String;
  yearcar: Number;
  items: QuotationDetail[];
  repair: RepairSubCategory[];
  totalprice: number;
  estimationtime: number;
  status: 'En attente' | 'Valide Cl' | 'Refu Cl'; // Enum for status
  datequote: Date;
  quoteVersion: number;
  isAccepted: boolean;
  createdAt: Date; // Automatically managed by Mongoose
  updatedAt: Date; // Automatically managed by Mongoose
  commentaire: Commentaire[];
}
