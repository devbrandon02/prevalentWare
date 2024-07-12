import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
  const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10);
  const hashedPasswordUser = await bcrypt.hash('userpassword', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: 'Admin User',
      password: hashedPasswordAdmin,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@user.com',
      name: 'Regular User',
      password: hashedPasswordUser,
      role: 'USER',
    },
  });

  console.log({ admin, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
