"use client";
// components/Carousel.js
import { useState, useEffect } from "react";

const Carousel = ({ items }) => {
  items = items
    ? items
    : [
        {
          image: "https://via.placeholder.com/300x200?text=Image+1",
          title: "Image 1",
        },
        {
          image: "https://via.placeholder.com/300x200?text=Image+2",
          title: "Image 2",
        },
        {
          image: "https://via.placeholder.com/300x200?text=Image+3",
          title: "Image 3",
        },
        {
          image: "https://via.placeholder.com/300x200?text=Image+4",
          title: "Image 4",
        },
        {
          image: "https://via.placeholder.com/300x200?text=Image+5",
          title: "Image 5",
        },
      ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const getItemIndex = (index) => {
    const mod = index % items.length;
    return mod >= 0 ? mod : mod + items.length;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform ease-linear duration-300"
        style={{ transform: `translateX(-${((currentIndex + 1) * 100) / 3}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-1/3 flex-shrink-0 px-2">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
        {items.slice(0, 3).map((item, index) => (
          <div key={items.length + index} className="w-1/3 flex-shrink-0 px-2">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
