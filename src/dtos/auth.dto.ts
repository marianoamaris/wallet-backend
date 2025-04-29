export interface AuthDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface TokenPayloadDTO {
  userId: string;
  iat?: number;
  exp?: number;
}
