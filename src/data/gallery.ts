export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/images/storefront.jpg",
    alt: "Casa di Pizza Main Entrance and Signboard",
    category: "exterior",
  },
  {
    id: "g2",
    src: "/images/wall-art-mural.jpg",
    alt: "Floral Wall Mural Art in Dining Area",
    category: "interior",
  },
  {
    id: "g3",
    src: "/images/fresh-pizzas.jpg",
    alt: "Freshly Baked Wood Fired Pizzas",
    category: "food",
  },
  {
    id: "g4",
    src: "/images/dining-area.jpg",
    alt: "Spacious Café Dining Seating and Ambiance",
    category: "interior",
  },
  {
    id: "g5",
    src: "/images/wood-fired-mural.jpg",
    alt: "Casa Di Pizza Wood Fired Oven Wall Artwork",
    category: "interior",
  },
];
