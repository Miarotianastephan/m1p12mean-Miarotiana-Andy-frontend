export interface SubService {
  categoryid: string;
  categoryname: string;
  estimatedprice: number;
  estimatedtime: number;
  name: string;
  _id: string;
  quantite_service: number | null; // seulement utilisable pour le devis
  description_service: string | null; // seulement utilisable pour le devis
}
