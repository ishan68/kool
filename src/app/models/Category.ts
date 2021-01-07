/**
 * Define Category Model
 */

export class Category {
  _id: string;
  name: string;
  image: string;
  bannerImage: string;
  slug: string;
  isSubCategory: boolean;
  parentCategory?: string;
}

