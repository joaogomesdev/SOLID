import { IUserRepository } from "../../repositories/IUserRepository";

interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export { 
  ICreateUserRequestDTO 
}