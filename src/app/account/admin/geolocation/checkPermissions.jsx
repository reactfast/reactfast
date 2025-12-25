import { useEffect, useState } from 'react'

export default function CheckPermissions() {
  const [permission, setPermission] = (useState < string) | (null > null)

  useEffect(() => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((result) => setPermission(result.state))
      .catch((err) => console.error(err))
  }, [])

  return <p>Geolocation Permission: {permission}</p>
}
