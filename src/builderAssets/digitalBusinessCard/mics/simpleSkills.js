export default function SimpleSkills({ obj, colors, id }) {
  const skills = obj.skills ?? [] // now it's an array

  return (
    <div id={id} className="mx-2">
      {skills.map((skill, i) => (
        <span
          key={i}
          className="mr-1 inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
        >
          {skill.label}
        </span>
      ))}
    </div>
  )
}
