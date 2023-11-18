export type UserResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    password: string;
    role: string;
    enabled: boolean;
    authorities: { authority: string }[];
    username: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
  };
};
