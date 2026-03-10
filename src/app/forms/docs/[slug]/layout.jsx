export default function layout({ children, slug }) {
  return (
    <>
      <div>{slug}</div>
      <div>{children}</div>
    </>
  )
}
