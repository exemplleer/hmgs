import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

// @ts-expect-error
prisma.$on('query', (e: Prisma.QueryEvent) => {
  console.info('⏱ ', 'Duration query: ' + e.duration + 'ms');
});

export default prisma;
