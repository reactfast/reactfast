/**
 *
 * @param {*} param0
 * obj {
 *  quote: String,
 *  author: String
 * }
 * @returns jsx
 */

export default function BigInfo({ obj, colors }) {
  return (
    <>
      <div className="pb-8 px-10 w-full dark:bg-white/[.06]">
        <div
          style={colors && { color: colors[0] }}
          className="text-center text-[100px]"
        >
          ...
        </div>
        <div className="text-center text-[30px]">
          "
          {obj?.qote
            ? obj.quote
            : "Being good in business is the most fascinating kind of art. Making money is art and working is art and good business is the best art."}
          "
        </div>
        <div className="text-center text-[30px] mb-24">
          {" "}
          ~ {obj?.author ? obj.author : "Andy Warhol"}
        </div>
      </div>
    </>
  );
}
