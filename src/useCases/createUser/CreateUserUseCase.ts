import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";


class CreateUserUseCase {
 
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ){

  }
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email)

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data)

    await this.userRepository.save(user)
    
    await this.mailProvider.sendMail({
      to: { 
        name: data.name,
        email: data.email,   
      }, 
      from: {
        name: 'JoJo`s Team',
        email: 'joaopfg.2002@gmail.com',   
       }, 
       subject: 'Welcome',
       body: '<p> Welcome to JoJo`s company, now you can login on the platform!!'
    })
    
  }
}

export {
  CreateUserUseCase
}