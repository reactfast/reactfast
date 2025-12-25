export default function Header({ obj, id }) {
  switch (obj.size) {
    case 'Small':
      return (
        <div id={id} className="text-md mx-2 my-4 font-bold">
          {obj.heading}
        </div>
      )
    case 'Medium':
      return (
        <div id={id} className="mx-2 my-4 text-lg font-bold">
          {obj.heading}
        </div>
      )
    case 'Large':
      return (
        <div id={id} className="mx-2 my-4 text-xl font-bold">
          {obj.heading}
        </div>
      )
    case 'Extra Large':
      return (
        <div id={id} className="mx-2 my-4 text-2xl font-bold">
          {obj.heading}
        </div>
      )
    default:
      return (
        <div id={id} className="mx-2 my-4 text-lg font-bold">
          {obj.heading}
        </div>
      )
  }
}
