import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { UnauthorizedError } from '@/http/_errors/unauthorized-error'
import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['billing'],
          summary: 'Get billing information from organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                total: z.number(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params

        const { organization, membership } =
          await request.getUserMembership(slug)

        const userId = await request.getCurrentUserId()

        const { cannot } = getUserPermissions(userId, membership)

        if (cannot('get', 'Billing')) {
          throw new UnauthorizedError(
            `You're not allow to get billing details from this organization`,
          )
        }

        const [amountOfMembers, amountOfProject] = await Promise.all([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: { not: 'BILLING' },
            },
          }),

          prisma.project.count({
            where: {
              organization: organization.id,
            },
          }),
        ])

        return {
          billing: {
            seats: {
              amount: amountOfMembers,
              unit: 10,
              price: amountOfMembers * 10,
            },
            projects: {
              amount: amountOfProject,
              unit: 20,
              price: amountOfProject * 20,
            },
            total: amountOfMembers * 10 + amountOfProject * 20,
          },
        }
      },
    )
}
