// lib/getAdminComponentRoutes.js
const fs = require('fs')
const path = require('path')

const ADMIN_COMPONENTS_DIR = path.join(
  process.cwd(),
  'src',
  'app',
  '(auth)',
  'admin',
  '[password]',
)

function getAdminComponentRoutes() {
  const routes = []

  function traverse(dir, baseRoute = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const routePath = path.join(baseRoute, entry.name).replace(/\\/g, '/')

      if (entry.isDirectory()) {
        const hasPage =
          fs.existsSync(path.join(fullPath, 'page.jsx')) ||
          fs.existsSync(path.join(fullPath, 'page.js'))

        if (hasPage) {
          routes.push(`/admin/components${routePath ? `/${routePath}` : ''}`)
        }

        traverse(fullPath, routePath)
      }
    }
  }

  traverse(ADMIN_COMPONENTS_DIR)

  return routes
}

module.exports = { getAdminComponentRoutes }
