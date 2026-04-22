import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '@saas/env'

import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter, log: ['query'] })
