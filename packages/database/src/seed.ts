import { prisma } from ".";

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
  {
    name: "Shota Nukumizu",
    email: 'Shota@Nukumizu.com',
  }
] as Array<Partial<User>>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            email: user.email!,
            name: user.name
          },
        })
      )
    );
  } catch (error) {
    console.error("🌟",error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
