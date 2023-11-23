export interface Course {
    id: string; // Unique identifier for the box
    title: string; // User-friendly name or label
    description: string; // Type or category of the box
    coverImageRelativePath: string; // Image of the box
    isPublished:boolean; // sold or not or damaged
    price: number; // Price of the box
    categories: Categories[]; // Color of the box
    chapters: Chapter[]; // Description of the box
  }

export interface Categories {
    id: string; // User-friendly name or label
    name: string; // Type or category of the box
  }

  export interface Chapter {
    title: string; // User-friendly name or label
    description: string; // Type or category of the box
    videoURL: string; // Image of the box
    position:number; // sold or not or damaged
    isFree:boolean; // Price of the box
  }
  
  