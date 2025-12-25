"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseCard({ program, image }) {
  const pathname = usePathname();
  return (
    <>
      <Link href={pathname + `/${program.slug.current}`}>
        <div className="z-10 relative w-full h-[350px] rounded-lg overflow-hidden shadow-lg">
          {/* Image on top */}
          <div className="relative w-full h-44">
            <Image
              src={image}
              alt="Course Image"
              layout="fill"
              objectFit="cover"
              className=" relative w-full
          h-full"
            />
          </div>

          {/* Info Card with gradient background */}
          <div className="absolute h-1/2 bottom-0 bg-gradient-to-b from-[#AE090C] to-[#000000] p-4 text-white flex flex-col">
            <div>
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {program.name}
              </h2>
              <p className="text-sm mb-4 line-clamp-3">{program.description}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
