import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const discounts = [
  "10% off on T-Shirts",
  "Buy 1 Get 1 Free on Jeans",
  "Sorry, no discount this time!",
  "Free shipping on orders over $50",
  "20% off on your next order",
  "15% off on all accessories",
];

const bgColors = ["#A7F3D0", "#FCD34D", "#FCA5A5", "#BFDBFE", "#E9D5FF", "#FDE68A"];
const predefinedCoupons = ["DISCOUNT10", "SAVE20", "FREESHIP"];

export default function WheelPopup() {
  const [visible, setVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (!hasSpun) {
      interval = setInterval(() => {
        setVisible(true);
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [hasSpun]);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const spinWheel = () => {
    if (spinning) return;

    const segCount = discounts.length;
    const segAngle = 360 / segCount;
    const randIndex = Math.floor(Math.random() * segCount);

    // ✅ حساب الزاوية لمركز القطاع
    const targetAngle = randIndex * segAngle + segAngle / 2;
    const rotations = 5; // عدد اللفات
    const newAngle = rotations * 360 + (360 - targetAngle);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    setSpinning(true);
    setAngle(newAngle);
    setHasSpun(true);

    setTimeout(() => {
      const selectedDiscount = discounts[randIndex];
      setResult(selectedDiscount);
      if (selectedDiscount !== "Sorry, no discount this time!") {
        const randomCoupon = predefinedCoupons[Math.floor(Math.random() * predefinedCoupons.length)];
        setCoupon(randomCoupon);
      } else {
        setCoupon("");
      }
      setSpinning(false);
    }, 5200);
  };

  const getWheelBackground = () => {
    const segments = discounts.map((_, i) => {
      const start = (i * 360) / discounts.length;
      const end = ((i + 1) * 360) / discounts.length;
      return `${bgColors[i % bgColors.length]} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${segments.join(", ")})`;
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md text-center relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg sm:text-2xl font-bold text-[#003366] mb-4">
          🎯 Spin the Wheel!
        </h2>

        {/* Wheel */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto my-6">
          <div className="absolute -top-6 sm:-top-7 left-1/2 transform -translate-x-1/2 z-10 text-3xl sm:text-4xl md:text-5xl text-red-500 select-none">
            ▲
          </div>

          <div
            className="w-full h-full rounded-full border-[5px] sm:border-[6px] border-[#9BC2AF] relative transition-transform duration-[5s] ease-out overflow-hidden"
            style={{
              transform: `rotate(${angle}deg)`,
              background: getWheelBackground(),
            }}
          >
            {discounts.map((label, i) => {
              const rotate = (360 / discounts.length) * i;
              return (
                <div
                  key={i}
                  className="absolute w-1/2 left-1/2 top-1/2 origin-left text-[10px] sm:text-[12px] md:text-[14px] font-semibold text-[#003366] leading-tight text-center px-1 sm:px-2 overflow-hidden"
                  style={{
                    transform: `rotate(${rotate}deg) translateX(14px)`,
                    transformOrigin: "left center",
                    whiteSpace: "normal",
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Result */}
        {result ? (
          <>
            <p className="text-sm sm:text-lg text-[#E76840] font-bold">
              🎉 You won: {result}
            </p>
            {coupon && (
              <div className="mt-3 flex flex-col items-center gap-2">
                <p className="text-xs sm:text-sm text-[#003366] select-text">
                  Your coupon code:{" "}
                  <span className="font-mono font-bold">{coupon}</span>
                </p>
                <button
                  onClick={handleCopy}
                  className="bg-[#003366] text-white px-3 sm:px-4 py-1 rounded-md text-xs sm:text-sm hover:bg-[#005599] transition-all"
                >
                  {copied ? "Copied!" : "Copy Coupon"}
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={spinWheel}
            className="bg-[#9BC2AF] text-white px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl hover:bg-[#E76840] transition-all text-sm sm:text-base"
          >
            Spin Now
          </button>
        )}

        <audio ref={audioRef} src="/spin-sound.mp3" preload="auto" />
      </div>
    </div>
  );
}
