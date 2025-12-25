export default function Paragraph({ obj, colors, id }) {
  return (
    <>
      <div id={id}>
        <p>{obj.content}</p>
      </div>
    </>
  )
}
