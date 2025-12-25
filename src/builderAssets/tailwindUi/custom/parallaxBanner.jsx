export default function ParallaxBanner({ src, children }) {
  return (
    <div className="relative w-full h-[0px] md:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${src})` }}
      ></div>
      <div className="relative z-10 flex items-center justify-center h-full p-4">
        {children && (
          <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md text-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
