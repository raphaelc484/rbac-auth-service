import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { UnauthorizedError } from '@/http/_errors/unauthorized-error'
import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function getProjects(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['projects'],
          summary: 'Get all organizations projects',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              projects: z.array(
                z.object({
                  description: z.string(),
                  id: z.uuid(),
                  name: z.string(),
                  slug: z.string(),
                  ownerId: z.uuid(),
                  avatarUrl: z.url().nullable(),
                  organizationId: z.uuid(),
                  owner: z.object({
                    id: z.uuid(),
                    name: z.string().nullable(),
                    avatarUrl: z.url().nullable(),
                  }),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError(
            `You're not allowed to see organization project.`,
          )
        }

        const projects = await prisma.project.findMany({
          select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            ownerId: true,
            avatarUrl: true,
            organizationId: true,
            createdAt: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            organizationId: organization.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        return reply.send({ projects })
      },
    )
}
