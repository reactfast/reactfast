export default function ServicesList_1({ obj = {}, colors = [], id = '' }) {
  const services = Array.isArray(obj.services) ? obj.services : []

  return (
    <ul
      id={id}
      className="mx-auto divide-y divide-gray-200 rounded-lg bg-white"
    >
      {services.length > 0 ? (
        services.map((item, idx) => (
          <ListItem
            key={idx}
            title={item.title || `Service ${idx + 1}`}
            description={
              item.description ||
              'This service description is currently unavailable.'
            }
          />
        ))
      ) : (
        <>
          <ListItem
            title="Audio/Video Production"
            description="Expertise in capturing, editing, and producing multimedia content."
          />
          <ListItem
            title="Social Media"
            description="Proficiency in managing and growing social media channels."
          />
          <ListItem
            title="IT / Tech Support"
            description="Providing technical assistance and support for hardware and software issues."
          />
        </>
      )}
    </ul>
  )
}

export function ListItem({ title = '', description = '' }) {
  return (
    <li className="items-start justify-between p-4 md:flex-row md:items-center">
      <span className="text-xl font-semibold">{title}</span>
      <p className="mt-2 text-sm text-gray-700 md:mt-0">{description}</p>
    </li>
  )
}
