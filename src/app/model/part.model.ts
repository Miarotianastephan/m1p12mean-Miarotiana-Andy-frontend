export interface Part {
    _id: string,
    brandId: string,
    brand: string,
    modelId: string,
    model: string,
    partName: string,
    description: string,
    price: number,
    createdAt: string,
    updatedAt: string,
    quantity?: number; // pour mettre la quantite optionnel
}