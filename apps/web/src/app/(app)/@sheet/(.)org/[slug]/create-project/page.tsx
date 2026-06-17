import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/project-form'
import { IntercepetedSheet } from '@/components/intercepted-sheet'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProject() {
  return (
    <IntercepetedSheet defaultOpen>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <ProjectForm />
        </div>
      </SheetContent>
    </IntercepetedSheet>
  )
}
