export interface Course {
    id: string; 
    title: string; 
    description: string; 
    coverImageRelativePath: string; 
    isPublished:boolean; 
    price: number; 
    likes: number;
    isLiked?: boolean;
    isPurchased?: boolean;
    isOwned?: boolean;
    categories: Categories[]; 
    chapters: Chapter[]; 
    authorName: string;
  }

export interface Categories {
    categoryId: string; 
    name: string; 
  }

  export interface Chapter {
    id: string;
    title: string; 
    description: string;
    videoURL: string; 
    position:number;
    isFree:boolean;
  }
  
  // price tier list 
  // Free
  // 19.99 (tier 1)
  // 29.99 (tier 2)
  // 30.99 (tier 3)