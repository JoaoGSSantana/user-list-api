import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user: User = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error(`User ${user_id} not found.`);
    }

    if (user.admin) {
      throw new Error("This user is already admin.");
    }

    const userAdmin: User = this.usersRepository.turnAdmin(user);

    return userAdmin;
  }
}

export { TurnUserAdminUseCase };
