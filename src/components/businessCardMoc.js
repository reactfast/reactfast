'use client'
import React, { useState } from 'react'

const BusinessCard = ({ qrCodePath }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="business-card-container cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="face front">
          <div className="card-content p-4">
            <div className="flex flex-col items-center">
              <div className="metallic-text mt-6 flex h-24 w-36 items-center justify-center rounded-full text-6xl font-black -tracking-widest">
                LOGO
              </div>
              <div>
                <h2 className="metallic-text text-center text-xl font-semibold">
                  Your Business Here
                </h2>
                <p className="metallic-text text-center text-sm font-thin italic">
                  Make an impression.
                </p>
              </div>
            </div>
            {/* <div className="text-sm">
              <p className="metallic-text">John Doe</p>
              <p className="metallic-text">CEO &amp; Founder</p>
              <p className="metallic-text">Email: johndoe@example.com</p>
              <p className="metallic-text">Phone: (123) 456-7890</p>
              <p className="metallic-text">
                Address: 123 Business Rd, City, State, ZIP
              </p>
            </div> */}
          </div>
        </div>

        {/* Back Side */}
        <div className="face back">
          <div className="card-content flex h-full items-center justify-center">
            {qrCodePath ? (
              <img
                src={qrCodePath}
                alt="QR Code"
                className="qr-code aspect-square w-1/3 mix-blend-exclusion"
              />
            ) : (
              <div className="qr-code bg-black"></div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Metallic Text Effect */
        .metallic-text {
          background: linear-gradient(90deg, #e0e0e0, #fefefe, #d1d1d1);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }
        @keyframes shine {
          0% {
            background-position: 0%;
          }
          100% {
            background-position: 200%;
          }
        }

        /* Container: perspective & fixed dimensions */
        .business-card-container {
          perspective: 1000px;
          width: 4in;
          height: 2.5in;
          position: relative;
        }

        /* Card Inner: initial angle (-25°) & 3D preservation */
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform: rotateY(-25deg);
          transform-style: preserve-3d;
          transition: transform 1000ms;
        }

        /* Flipped state: rotate by 180° from resting state (-25° + 180° = 155°) */
        .card-inner.flipped {
          transform: rotateY(155deg);
        }

        /* Face Styles: use a dark gray background and rounded corners */
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
          backface-visibility: hidden;
          background: #2d2d2d; /* dark gray background */
          border-radius: 0.3rem;
        }

        /* Back face is rotated 180° */
        .face.back {
          transform: rotateY(180deg);
        }

        /* Simulated Card Edges for realistic thickness */
        .card-inner::after,
        .card-inner::before {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          width: 3px;
          z-index: 10;
          backface-visibility: hidden;
        }

        /* Right Edge */
        .card-inner::after {
          right: -3px;
          transform-origin: left;
          transform: perspective(1000px) rotateY(90deg);
          background: linear-gradient(to right, #b0b0b0, #e0e0e0, #b0b0b0);
          mask-image: linear-gradient(
            to bottom,
            transparent 0px,
            black 10px,
            black calc(100% - 10px),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0px,
            black 10px,
            black calc(100% - 10px),
            transparent 100%
          );
        }

        /* Left Edge */
        .card-inner::before {
          left: -3px;
          transform-origin: right;
          transform: perspective(1000px) rotateY(-90deg);
          background: linear-gradient(to left, #b0b0b0, #e0e0e0, #b0b0b0);
          mask-image: linear-gradient(
            to bottom,
            transparent 0px,
            black 10px,
            black calc(100% - 10px),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0px,
            black 10px,
            black calc(100% - 10px),
            transparent 100%
          );
        }
      `}</style>
    </div>
  )
}

export default BusinessCard
