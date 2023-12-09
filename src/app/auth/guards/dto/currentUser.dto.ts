export interface CurrentUserDTO {
  sub?: string;
  userId?: string;
  name: string;
  email: string;
  // permissoes: string[];
  createdAt: string;
}
