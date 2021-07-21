import { Request , Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase';
class CreateUserController {
  constructor(
    private createuserUseCase: CreateUserUseCase,
  ){}

  async handle(request: Request, response:Response): Promise<Response> {
    const { name, email, password } = request.body

    try {
      await this.createuserUseCase.execute({
        name, 
        email, 
        password
      })

      return response.status(201).send()
    }catch (error) {
      return response.status(400).json({ 
        messsage: error.message || 'Unexpected error :(' 
      })
    }

    
  }
}

export {
  CreateUserController
}