import { Categories, Chapter } from "../../models/course";

export interface PostCourseDraftDto {
    id: string;
    title: string;
    description: string;
    coverImageRelativePath: string;
    price: number;
    isPublished: boolean;
    categories: Categories[];
    chapters: Chapter[];
}