// lib/remarkNovaPreview.js
import { visit } from 'unist-util-visit'

export default function remarkNovaPreview() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const regex = /\{%\s*nova-preview\s+fields=(\[.*?\])\s*\/%\}/gs

      const matches = [...node.value.matchAll(regex)]
      if (!matches.length) return

      const newNodes = []
      let lastIndex = 0

      for (const match of matches) {
        const [full, fieldsRaw] = match
        const start = match.index
        const end = start + full.length

        if (start > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex, start),
          })
        }

        newNodes.push({
          type: 'novaPreview',
          data: {
            hName: 'nova-preview',
            hProperties: {
              fields: JSON.parse(fieldsRaw),
            },
          },
        })

        lastIndex = end
      }

      if (lastIndex < node.value.length) {
        newNodes.push({
          type: 'text',
          value: node.value.slice(lastIndex),
        })
      }

      parent.children.splice(index, 1, ...newNodes)
    })
  }
}
