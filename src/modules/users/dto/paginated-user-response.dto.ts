import { PaginatedResponseDto } from '../../../common/dto/paginated-response.dto';
import { User } from '../entities/user.entity';

export class PaginatedUserResponse extends PaginatedResponseDto<User> {
  declare items: User[];
}
