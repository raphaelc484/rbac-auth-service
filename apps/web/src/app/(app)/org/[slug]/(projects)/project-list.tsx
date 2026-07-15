import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ProjectList() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Projeto 01</CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
            dicta? Voluptate, atque cumque obcaecati inventore rem iste
            similique recusandae qui quis? Veniam, maxime excepturi! Maxime
            illum voluptatem suscipit quia dolores?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-1.5">
          <Avatar className="size-4">
            <AvatarImage src="https://github.com/raphaelc484.png" />
            <AvatarFallback />
          </Avatar>
          <span className="text-muted-foreground text-xs">
            Created by{' '}
            <span className="text-foreground font-medium">Raphael Miranda</span>{' '}
            a day ago
          </span>
          <Button size="xs" variant="outline" className="ml-auto">
            View <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
