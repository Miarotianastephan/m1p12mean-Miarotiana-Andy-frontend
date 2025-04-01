export interface IMechanic {
  fullName: string;
  email: string;
  phonenumber?: string;
  isActive: boolean;
  skills: {
    categoryId: string; // L'ID de la catégorie sous forme de string
    namecategory: string;
  }[];
  salary: number;
  userId: string; // L'ID de l'utilisateur sous forme de string
}
