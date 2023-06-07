import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.user.upsert({
    where: { email: 'Shota@Nukumizu.com' }, // データベースを設置する場所
    update: {}, // データ更新をする必要がないのでとりあえず保留
    // データの中身を設計する
    create: {
      email: 'Shota@Nukumizu.com',
      name: 'Shota Nukumizu',
    },
  });

  console.log({ post1 });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
