import Image from "next/image";

export default function PhotoBanner({ src }) {
  return (
    <div className="relative w-full overflow-hidden h-[300px]  border-b-4 border-primary p-4 pl-48">
      <Image
        alt="Students"
        src={src}
        layout="fill"
        objectFit="cover"
        className="opacity-100 h-full w-full transform transition duration-500 hover:scale-110"
      />
    </div>
  );
}
