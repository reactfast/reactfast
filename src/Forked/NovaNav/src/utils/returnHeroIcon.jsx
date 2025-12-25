import * as Icons from "@heroicons/react/24/outline";

export default function ReturnHeroIcon({ name, color }) {
  const Icon = Icons[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <div className="rounded-full p-2">
      <Icon
        className="h-5 w-5"
        style={{ color: color || "#ccc" }} // default gray if color not provided
      />
    </div>
  );
}
