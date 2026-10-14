import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Ward } from 'src/modules/wards/entities/ward.entity';
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
    const provinceFilePath = join(
      process.cwd(),
      'src/database/json/province.json',
    );
    const provinceData = JSON.parse(
      readFileSync(provinceFilePath, 'utf8'),
    ) as ProvinceJson;

    const provinces = Object.values(provinceData).map((item) => ({
      id: Number(item.code),
      name: item.name,
      slug: item.slug,
      type: item.type,
      nameWithType: item.name_with_type,
      code: item.code,
    }));

    const provinceRepository = app.get<Repository<Province>>(
      getRepositoryToken(Province),
    );
    await provinceRepository.upsert(provinces, ['id']);

    console.log(`Seeded ${provinces.length} provinces`);

    const wardFilePath = join(process.cwd(), 'src/database/json/ward.json');
    const wardData = JSON.parse(readFileSync(wardFilePath, 'utf8')) as WardJson;

    const wards = await Promise.all(
      Object.values(wardData).map(async (item) => ({
        id: Number(item.code),
        name: item.name,
        slug: item.slug,
        type: item.type,
        nameWithType: item.name_with_type,
        path: item.path,
        pathWithType: item.path_with_type,
        code: item.code,
        parentCode: item.parent_code,
        provinceId: (
          await provinceRepository.findOneBy({ code: item.parent_code })
        )?.id,
      })),
    );

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
