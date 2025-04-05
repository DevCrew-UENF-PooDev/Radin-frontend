import type { UserInfoI } from './ChatInterface';

export interface ErrorResponseI {
  response: { data: { error: string } };
}

export interface GenericResponseI {
  message: string;
}

export interface PaginationInfoI {
  page: number;
  limit: number;
}

export interface UserPaginationStateI extends PaginationInfoI {
  users: UserInfoI[];
}
