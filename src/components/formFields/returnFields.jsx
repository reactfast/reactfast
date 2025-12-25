import * as Inputs from '@/components/formFields/barrel'

const defaultTheme = {
  title: '#000',
  label: '#111',
  inputText: '#000',
  inputBackground: '#fff',
  inputBorder: '#ebebeb',
  inputPlaceholder: '#888',
  inputFocusBorder: '#020DF9',
  description: '#555',
  error: '#ff0000',
  requiredAsterisk: '#020DF9',

  // ⭐ Rating-specific
  ratingActive: '#020DF9', // selected star
  ratingInactive: '#8e8e8eff', // default star
  ratingHover: '#5555ff', // hover state
}

export function ReturnFieldsV2({ field, onChange, value, theme }) {
  if (!field || !field.type) return null

  const type = field?.type

  const mergedTheme = { ...defaultTheme, ...(theme || {}) }

  const handleCustomChange = (name, newValue) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue,
        },
      })
    }
  }

  const renderField = (subField, subValue, index, handleChange) => {
    return (
      <ReturnFieldsV2
        key={index}
        field={subField}
        value={subValue}
        onChange={(newVal) => handleChange(newVal, index)}
        theme={mergedTheme}
      />
    )
  }

  switch (type) {
    case 'string':
      return (
        <Inputs.InputDefault
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'text':
      return (
        <Inputs.InputTextArea
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'color':
      return (
        <Inputs.InputColor
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'file':
      return (
        <Inputs.AutoUploadFileField
          id={field.name}
          name={field.name}
          folder={'root'}
          onChange={(url) => onChange(url)} // Pass the URL back to parent
          value={value} // Ensure the value persists
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      )
    case 'fileV2':
      return (
        <div className="space-y-2">
          <Inputs.MediaSelectorModal
            // onClose={() => setMediaModalOpen(false)}
            onSelect={(url) => {
              handleCustomChange(field.name, url)
            }}
            value={value}
          />
        </div>
      )
    case 'number':
      return (
        <Inputs.InputNumber
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'boolean':
      return (
        <Inputs.InputCheckbox
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'toggle':
      return (
        <Inputs.InputToggle
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'date':
      return (
        <Inputs.InputDate
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'datetime':
      return (
        <Inputs.DateTime
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'time':
      return (
        <Inputs.TimeInput
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'select':
      return (
        <Inputs.SingleSelect
          field={field}
          value={value}
          onChange={(val) => handleCustomChange(field.name, val)}
          theme={mergedTheme}
        />
      )
    case 'multiselect':
      return (
        <Inputs.MultiSelect
          field={field}
          value={value}
          onChange={(val) => handleCustomChange(field.name, val)}
          theme={mergedTheme}
        />
      )
    case 'uploadToBase':
      return (
        <Inputs.ImageUploadBase64
          field={field}
          value={value}
          onChange={(val) => handleCustomChange(field.name, val)}
          theme={mergedTheme}
        />
      )
    case 'array':
      if (false) {
        // basic array of strings/numbers
        return (
          <MultiSelect
            value={Array.isArray(value) ? value : []}
            onChange={(newValue) => handleCustomChange(field.name, newValue)}
          />
        )
      } else {
        // array of objects with subfields
        const subForm = field.fields

        return (
          <Inputs.DynamicSubForm
            field={field}
            fields={subForm}
            title={field.title || field.name}
            onSave={(newArray) => handleCustomChange(field.name, newArray)}
            value={Array.isArray(value) ? value : []}
          />
        )
      }
    case 'subForm':
      return (
        <div className="space-y-2">
          {field.fields.map((subField, index) =>
            renderField(subField, value?.[subField.name], index, (newVal) => {
              const newValue = { ...value, [subField.name]: newVal }
              handleCustomChange(field.name, newValue) // Use synthetic event
            }),
          )}
        </div>
      )
    case 'email':
      return (
        <Inputs.EmailInput
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'tel':
      return (
        <Inputs.PhoneInput
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'radio':
      return (
        <Inputs.RadioGroup
          field={field}
          value={value}
          onChange={(val) => handleCustomChange(field.name, val)}
          theme={mergedTheme}
        />
      )
    case 'url':
      return (
        <Inputs.UrlInput
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'captcha':
      return (
        <Inputs.Captcha
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )

    case 'signature':
      return (
        <Inputs.Signature
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'rating':
      return (
        <Inputs.Rating
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'scale':
      return (
        <Inputs.Scale
          field={field}
          value={value}
          onChange={onChange}
          theme={mergedTheme}
        />
      )
    case 'header':
      return <Inputs.FormHeader field={field} />
    case 'image':
      return <Image src={field.image.src} />
    case 'paragraph':
      return <p>{field.content}</p>
    default:
      return null
  }
}
