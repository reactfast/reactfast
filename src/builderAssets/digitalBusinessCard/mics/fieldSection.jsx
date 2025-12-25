export default function FieldSection({
  obj = {},
  colors = [],
  id = '',
  fields = [],
}) {
  return (
    <Section title={obj?.sectionTitle || 'Profile'} id={id}>
      {Array.isArray(obj.profile_fields) && obj.profile_fields.length > 0 ? (
        <div className="space-y-2">
          {obj.profile_fields.map((field, index) => (
            <Field
              key={field.label || index}
              label={field.label || field.name}
              value={
                field.label?.toLowerCase().includes('weight') && field.value
                  ? `${field.value} lbs`
                  : field.value
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-500">No information available</p>
        </div>
      )}
    </Section>
  )
}

function Section({ title, children, id }) {
  return (
    <div id={title} className="mx-auto max-w-2xl px-6 py-8">
      {/* Section Header with refined styling */}
      <h2 className="mb-6 text-center text-xl font-light text-gray-900">
        {title}
      </h2>

      {/* Content Area */}
      <div className="rounded-xl bg-white p-1">{children}</div>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div className="group flex items-center justify-between rounded-lg bg-white px-4 py-3 transition-all duration-200 hover:bg-gray-50">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm font-normal text-gray-900">{value || '—'}</span>
    </div>
  )
}
