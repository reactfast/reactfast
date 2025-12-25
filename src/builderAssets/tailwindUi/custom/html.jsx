export default function html({ obj, colors }) {
  return (
    <>
      <div
        className="w-full overflow-x-hidden"
        dangerouslySetInnerHTML={obj.content}
      ></div>
    </>
  );
}
