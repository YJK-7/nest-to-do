"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
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
];
(async () => {
    try {
        await Promise.all(DEFAULT_USERS.map((user) => _1.prisma.user.upsert({
            where: {
                email: user.email,
            },
            update: {
                ...user,
            },
            create: {
                email: user.email,
                name: user.name
            },
        })));
    }
    catch (error) {
        console.error("🌟", error);
        process.exit(1);
    }
    finally {
        await _1.prisma.$disconnect();
    }
})();
