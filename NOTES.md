# SOLID

## Entities
  - A representation of a model used in the project usually represents an entity that is directly linked to the business rules of our app

  ```ts
      // User entitie 
      class User {
      public readonly id: string

      public name: string
      public email: string
      public password: string

        constructor(props: Omit<User, 'id'>, id?: string){
            Object.assign(this, props);

            if(!id) {
              this.id = uuid();
            }
        }
      }
  ```
- The constructor uses the **Object.assign()** to set the props values
- We give the class the **responsibility** of creating the id, because the database is an **external** layer (Infrastructure)

## UseCases
  - Use cases represents a **functionality** that the user can perform in our application
  - Implements the **functionality**

  ```ts
    class CreateUserUseCase {
  
    constructor(
      private userRepository: IUserRepository,
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
      
        this.mailProvider.sendMail({
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
  ```
 

## Controllers
   - We put **controller** inside our use cases and didn't put it inside a **controllers** folder for better organization. Following the **package by feature** model

  ```ts
  ```
## DTO 
  - A **data transfer object** (DTO) is an object that carries **data** between processes. The motivation for its use is that **communication between processes** is usually done resorting to remote interfaces (e.g., web services), where each call is an **expensive operation.**

  ```ts
  ```

## Repositories 
 - Implements the **operations** we can do on a given tThey are a way to organize external service providers such as emailsype of **storage**

  ```ts
  ```

 ### Repositories Interfaces
 - Difine the **methods** types that we can do on a Repository (A **Contact**)
  
  ```ts
  ```

  ## Providers 
  - They are a way to **organize external service providers** such as **emails**

  ```ts
  ```