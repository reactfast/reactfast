import {
  AcademicCapIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    id: 1,
    icon: <AcademicCapIcon className="h-16 w-16" />,
    title: "Service One",
    description: "Description for service one.",
  },
  {
    id: 2,
    icon: <CheckBadgeIcon className="h-16 w-16 " />,
    title: "Service Two",
    description: "Description for service two.",
  },
  {
    id: 3,
    icon: <BriefcaseIcon className="h-16 w-16" />,
    title: "Service Three",
    description: "Description for service three.",
  },
  {
    id: 4,
    icon: <CurrencyDollarIcon className="h-16 w-16" />,
    title: "Service Four",
    description: "Description for service four.",
  },
  {
    id: 5,
    icon: <AcademicCapIcon className="h-16 w-16 " />,
    title: "Service Five",
    description: "Description for service five.",
  },
  {
    id: 6,
    icon: <CheckBadgeIcon className="h-16 w-16 " />,
    title: "Service Six",
    description: "Description for service six.",
  },
  {
    id: 7,
    icon: <BriefcaseIcon className="h-16 w-16 " />,
    title: "Service Seven",
    description: "Description for service seven.",
  },
  {
    id: 8,
    icon: <CurrencyDollarIcon className="h-16 w-16 " />,
    title: "Service Eight",
    description: "Description for service eight.",
  },
];

export default function ServicesSection({ obj, colors }) {
  return (
    <div className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="text-center">
              <div
                style={colors && { color: colors[0] }}
                className="flex justify-center mb-4"
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold opacity-90">{service.title}</h3>
              <p className="mt-2 text-base opacity-70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
