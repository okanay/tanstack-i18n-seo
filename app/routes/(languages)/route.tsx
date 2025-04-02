import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(languages)')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(languages)"!</div>
}
