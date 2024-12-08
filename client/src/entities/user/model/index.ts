
// ТИП РОЛИ
export type RoleType = {
  id: number;
  name: string;
}

export type RoleTypeNiId = {
  name: string;
}

export type RoleList = RoleType[]

export type UserType = {
  id: number,
  name: string,
  email: string,
  password: string,
  phone: number,
  verify_status: string
  company_name: string,
  company_description: string,
  role_id:number;
  role:RoleType;
  city_id:number;
  createdAt: Date,
  updatedAt: Date
};
export type UserList = UserType[]
export type UserWithoutIdType = Omit<UserType, 'id'>;
export type UserWithoutPasswordType = Omit<UserType, 'password'>;
export type UserIdType = UserType['id'];
