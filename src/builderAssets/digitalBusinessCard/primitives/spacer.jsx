export default function Spacer({ obj, id }) {
  return <div id={id} style={{ height: obj?.height + 'px' }} />
}
