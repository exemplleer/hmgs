import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

prisma.$on('query', (e) => {
  console.log('Duration query: ' + e.duration + 'ms');
});

export default prisma;
