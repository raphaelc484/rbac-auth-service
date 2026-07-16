import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export default async function Projects() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  return (
    <div className="py-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        {permissions?.can('create', 'Project') && (
          <Button size="sm">
            <Link
              href={`/org/${currentOrg}/create-project`}
              className="flex items-center"
            >
              <Plus className="mr-2 size-4" />
              Create Project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-muted-foreground text-sm">
          You ara not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
