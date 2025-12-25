'use client'

import { useState, useEffect } from 'react'

const DynamicForm = ({ value, onChange }) => {
  const [definition, setDefinition] = useState(null)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!value) return

    const fetchDefinition = async () => {
      try {
        const response = await fetch(
          `https://wx2yhmrc8c.execute-api.us-east-2.amazonaws.com/dev/section-types/component/${value}`,
        )
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json()
        setDefinition(data.definitions)
        const initialFormData = Object.keys(data.definitions).reduce(
          (acc, key) => {
            acc[key] = ''
            return acc
          },
          {},
        )
        setFormData(initialFormData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDefinition()
  }, [value])

  const handleChange = (event, key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: event.target.value,
    }))
    onChange(PatchEvent.from(set(JSON.stringify(formData))))
  }

  const renderInputField = (key, type) => {
    return type === 'TEXTAREA' ? (
      <textarea
        id={key}
        name={key}
        value={formData[key]}
        onChange={(e) => handleChange(e, key)}
        placeholder={`Enter ${key}`}
      />
    ) : (
      <input
        id={key}
        name={key}
        type="text"
        value={formData[key]}
        onChange={(e) => handleChange(e, key)}
        placeholder={`Enter ${key}`}
      />
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      {definition && (
        <form>
          {Object.keys(definition).map((key) => (
            <div key={key}>
              <label htmlFor={key}>{key}</label>
              {renderInputField(
                key,
                typeof definition[key] === 'string'
                  ? 'STRING'
                  : definition[key],
              )}
            </div>
          ))}
        </form>
      )}
    </div>
  )
}

export default DynamicForm
