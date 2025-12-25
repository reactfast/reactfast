/*

obj = {
  type: "Hero_3",
  component: "Hero_3",
  definitions:{
    "title": "STRING",
    "subTitle": "STRING",
    "content": "STRING",
    "_h2": "h2",
    "col1Title": "STRING",
    "col1Subtitle": "STRING",
    "col2Title": "STRING",
    "col2Subtitle": "STRING",
    "sectionContent": "STRING",
  }
}
  
*/

export default function Hero_3({ obj, colors }) {
  return (
    <>
      <div className="grid grid-cols-12 w-full px-8 py-28 sm:p-36 bg-black text-white">
        <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl font-black mb-8">
            {obj?.title ? obj.title : "MSc PSYCHOLOGY"}
          </h1>
          <h3 className="text-3xl font-base">
            {obj?.subTitle ? obj.subTitle : "100% Online"}
          </h3>
          <p className="text-lg font-thin">
            {obj?.content
              ? obj.content
              : "A life-changing online MAsters degree in psychology from a global university"}
          </p>
        </div>
        <div className="col-span-12 lg:col-span-6 order-1">Logo</div>
      </div>
      <div className=" shadow-2xl font-thin text-lg relative top-[-50px] grid w-4/5 md:w-2/3 grid-cols-12 mx-auto bg-red-800 p-8 text-white">
        <div className="col-span-12 sm:col-span-6 text-center">
          <p>{obj?.col1Subtitle ? obj.col1Subtitle : "APPLY BY"}</p>
          <h3 className="text-4xl font-black">
            {obj?.col1Title ? obj.col1Title : "FEBRUARY 2024"}
          </h3>
        </div>
        <div className="sm:hidden h-[1px] bg-white w-full col-span-12 my-4">
          {" "}
        </div>
        <div className=" col-span-12 sm:col-span-6 text-center">
          <p>{obj?.col1Subtitle ? obj.col1Subtitle : "TO START"}</p>
          <h3 className="text-4xl font-black">
            {obj?.col2Title ? obj.col2Title : "7th MARCH 2024"}
          </h3>
        </div>
        <p className="col-span-12 w-full text-center pt-4 text-base">
          {obj?.sectionContent
            ? obj.sectionContent
            : "180 CREDITS ~ 2 YEARS PART-TIME ~ 7,800 TOTAL FEES"}
        </p>
      </div>
    </>
  );
}
