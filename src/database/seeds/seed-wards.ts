import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { Province } from '../../modules/provinces/entities/province.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';

type WardJson = Record<
  string,
  {
    name: string;
    type: string;
    slug: string;
    name_with_type: string;
    path: string;
    path_with_type: string;
    code: string;
    parent_code: string;
  }
>;

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const filePath = join(process.cwd(), 'src/database/json/ward.json');
    const data = JSON.parse(readFileSync(filePath, 'utf8')) as WardJson;

    const wards: Partial<Ward>[] = Object.values(data).map((item) => ({
      id: Number(item.code),
      name: item.name,
      slug: item.slug,
      type: item.type,
      nameWithType: item.name_with_type,
      path: item.path,
      pathWithType: item.path_with_type,
      code: item.code,
      parentCode: item.parent_code,
    }));

    const repository = app.get<Repository<Ward>>(getRepositoryToken(Ward));
    await repository.upsert(wards, ['id']);

    console.log(`Seeded ${wards.length} wards`);
  } finally {
    await app.close();
  }
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
