export interface ConnectionOptionsDto {
  host: string;
  port?: number;
  database: string;
  username?: string;
  password?: string;
  logging?: boolean;
}
