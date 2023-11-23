export interface Course {
    id: string; 
    title: string; 
    description: string; 
    coverImageRelativePath: string; 
    isPublished:boolean; 
    price: number; 
    categories: Categories[]; 
    chapters: Chapter[]; 
  }

export interface Categories {
    id: string; 
    name: string; 
    avatar_url: string; 
  }

  export interface Chapter {
    id: string;
    title: string; 
    videoURL: string; 
    position:number;
    isFree:boolean;
  }
  
  