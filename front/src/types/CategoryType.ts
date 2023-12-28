export interface CategoryType {
  id: number;
  parentId: number;
  name: string;
  description: string;
  children?: CategoryType[] | null;
}