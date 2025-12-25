/*
Profile

This pages is when a user is logged in and wast sto see useful
information. there will also be navigation here so that the user can
get to other useful pages
*/

export default function () {
  return (
    <>
      <div>
        <h1 className="text-5xl font-black">Profile</h1>
        <p>
          This page is for a user to view only there personal information. and
          other useful data like next payment date and there current
          subscription
        </p>
        {/* <Links /> */}
        <div>
          <div className="grid h-[75vh] grid-cols-12 gap-[1px] bg-black p-[1px]">
            <div className="col-span-12 flex h-full bg-white"></div>
            <div className="col-span-3 flex h-full bg-white">
              <div className="m-auto flex justify-center"></div>
            </div>
            <div className="col-span-5 flex h-full bg-white">
              <div className="m-auto flex justify-center">ssss</div>
            </div>
            <div className="col-span-4 flex h-full bg-white">
              <div className="m-auto flex justify-center">ssss</div>
            </div>
          </div>
          <div className="grid h-[75vh] grid-cols-12 gap-[1px] bg-black p-[1px]">
            <div className="col-span-4 h-full bg-white"></div>
            <div className="col-span-8 flex h-full bg-white">
              <div className="m-auto flex justify-center">
                Screen shots of MVP or figma mocks
              </div>
            </div>
          </div>
          <div className="grid h-[75vh] grid-cols-12 gap-[1px] bg-black p-[1px]">
            <div className="col-span-6 h-full bg-white"></div>
            <div className="col-span-6 flex h-full bg-white"></div>
          </div>
        </div>
      </div>
    </>
  )
}
