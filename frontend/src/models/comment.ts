export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  parentId: string | null;
  votes: number;
}
