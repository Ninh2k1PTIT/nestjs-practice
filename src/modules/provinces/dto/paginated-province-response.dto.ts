import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { Province } from '../entities/province.entity';

export class PaginatedProvinceResponseDto extends PaginatedResponseDto<Province> {
  declare items: Province[];
}
