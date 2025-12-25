"use client";

import Marquee from "react-fast-marquee";

function Scroller() {
  return (
    <Marquee autofill={true} speed={25} className="h-24" pauseOnHover>
      <ScrollItem inner={"Cyber Security"} />
      <ScrollItem inner={"Software Engineering"} />
      <ScrollItem inner={"MBA"} />
      <ScrollItem inner={"Business Strategy"} />
      <ScrollItem inner={"Corporate Finance Law"} />
      <ScrollItem inner={"MSc Finance"} />
    </Marquee>
  );
}

function ScrollItem({ inner }) {
  return (
    <a href="#">
      <p
        dangerouslySetInnerHTML={{ __html: inner }}
        className="text-5xl mr-12 font-black"
      ></p>
    </a>
  );
}

export default Scroller;
