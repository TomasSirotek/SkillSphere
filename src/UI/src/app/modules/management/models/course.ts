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
  
  // price tier list 
  // Free
  // 19.99 (tier 1)
  // 29.99 (tier 2)
  // 30.99 (tier 3)