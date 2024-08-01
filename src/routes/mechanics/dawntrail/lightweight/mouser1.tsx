import { createFileRoute } from '@tanstack/react-router'
import { Arena } from '../../../../aac/lhw/m1s/arena/Arena'

export const Route = createFileRoute('/mechanics/dawntrail/lightweight/mouser1')({
  component: () => <Arena></Arena>
})