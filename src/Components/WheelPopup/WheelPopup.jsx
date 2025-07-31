import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const discounts = ['5% OFF', '10% OFF', 'Better luck!', '20% OFF', 'Try Again', 'Free Shipping'];

export default function WheelPopup({ onClose }) {
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning) return;

    const segCount = discounts.length;
    const segAngle = 360 / segCount;

    const randIndex = Math.floor(Math.random() * segCount);
    const newAngle = 360 * 5 + (randIndex * segAngle) + segAngle / 2;

    setSpinning(true);
    setAngle(newAngle);

    setTimeout(() => {
      setResult(discounts[randIndex]);
      setSpinning(false);
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-[#003366] mb-4">🎯 Try Your Luck!</h2>

        <div className="relative w-64 h-64 mx-auto my-6">
          {/* المؤشر العلوي */}
          <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 text-red-500 text-3xl z-10">
            ▼
          </div>

          {/* عجلة الحظ */}
          <div
            className="w-full h-full rounded-full border-[6px] border-[#9BC2AF] relative transition-transform duration-[5s] ease-out"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            {discounts.map((item, index) => {
              const rotate = (360 / discounts.length) * index;
              const bgColors = ['#FDE68A', '#A7F3D0', '#BFDBFE', '#FCA5A5', '#E9D5FF', '#FCD34D'];

              return (
                <div
                  key={index}
                  className="absolute top-0 left-1/2 origin-top w-1/2 h-1/2 flex justify-center items-center"
                  style={{
                    transform: `rotate(${rotate}deg)`,
                    backgroundColor: bgColors[index % bgColors.length],
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  }}
                >
                  <span
                    className="text-[11px] font-semibold text-[#003366]"
                    style={{ transform: `rotate(${-rotate}deg)` }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {result ? (
          <p className="text-lg text-[#E76840] font-bold">🎉 You won: {result}</p>
        ) : (
          <button
            onClick={spinWheel}
            className="bg-[#9BC2AF] text-white px-6 py-2 rounded-xl hover:bg-[#E76840] transition-all"
          >
            Spin Now
          </button>
        )}
      </div>
    </div>
  );
}
