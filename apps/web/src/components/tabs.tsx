import { ability, getCurrentOrg } from '@/auth/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const currentOrg = await getCurrentOrg()
  const permisssions = await ability()

  const canUpdateOrganization = permisssions?.can('update', 'Organization')
  const canGetBilling = permisssions?.can('get', 'Billing')
  const canGetMembers = permisssions?.can('get', 'User')
  const canGetProjects = permisssions?.can('get', 'Project')

  return (
    <div className="mb-2 border-b py-2">
      <nav className="mx-auto flex max-w-300 items-center gap-2">
        {canGetProjects && (
          <Button variant="ghost" size="sm">
            <NavLink
              href={`/org/${currentOrg}`}
              className="text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground border-transparent"
            >
              Projects
            </NavLink>
          </Button>
        )}

        {canGetMembers && (
          <Button variant="ghost" size="sm">
            <NavLink
              href={`/org/${currentOrg}/members`}
              className="text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground border-transparent"
            >
              Members
            </NavLink>
          </Button>
        )}

        {(canGetBilling || canUpdateOrganization) && (
          <Button variant="ghost" size="sm">
            <NavLink
              href={`/org/${currentOrg}/settings`}
              className="text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground border-transparent"
            >
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
