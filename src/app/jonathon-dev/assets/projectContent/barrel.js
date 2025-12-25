import { jotSpace } from './jotspace'
import { jotPets } from './jotpets'
import { novaForms } from './novaforms'
import { nextDrive } from './nextdrive'
import { keyFindr } from './keyfindr'
import { antisocialSuite } from './antisocialsuite'
import { escRoomGames } from './escroomgames'

export const allProjects = [
  jotSpace,
  jotPets,
  novaForms,
  nextDrive,
  keyFindr,
  antisocialSuite,
  escRoomGames,
]

export function returnProjectBySlug(slug) {
  return allProjects.find((project) => project.slug === slug)
}
