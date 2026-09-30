export interface Snippet {
  id: string;
  title: string;
  content: string;
  language: string;
  description: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SnippetPage {
  content: Snippet[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface SnippetQuery {
  query?: string;
  language?: string;
  tag?: string;
  page: number;
  size: number;
  sort: string;
}

export interface SnippetRequest {
  title: string;
  content: string;
  language: string;
  description: string | null;
  tags: string[];
}
