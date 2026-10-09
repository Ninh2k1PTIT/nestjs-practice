import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { Province } from '../../modules/provinces/entities/province.entity';

type ProvinceJson = Record<
  string,
  {
    name: string;
    slug: string;
    type: string;
    name_with_type: string;
    code: string;
  }
>;

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const filePath = join(process.cwd(), 'province.json');
    const data = JSON.parse(readFileSync(filePath, 'utf8')) as ProvinceJson;

    const provinces: Partial<Province>[] = Object.values(data).map((item) => ({
      id: Number(item.code),
      name: item.name,
      slug: item.slug,
      type: item.type,
      nameWithType: item.name_with_type,
      code: item.code,
    }));

    const repository = app.get<Repository<Province>>(
      getRepositoryToken(Province),
    );
    await repository.upsert(provinces, ['id']);

    console.log(`Seeded ${provinces.length} provinces`);
  } finally {
    await app.close();
  }
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
