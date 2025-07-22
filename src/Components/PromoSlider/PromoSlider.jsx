import React, { useEffect, useState } from 'react';

export default function PromoSlider() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // تاريخ انتهاء العرض (بعد ساعة مثلاً)
  const endTime = new Date().getTime() + 160000 * 1000;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#9BC2B0] text-white py-3 px-4 text-center">
      <div className="max-w-screen-xl mx-auto ">
        <h2 className="text-xl md:text-2xl font-bold mb-2">⚡Limited Time Offer!</h2>
        <p className="text-sm md:text-base ml-8 mb-4">Get 5 for 500 EGP with our Mystery Bags!</p>

        <div className="flex justify-center ml-8 gap-6 text-base md:text-lg font-mono font-semibold">
          <div className="flex flex-col items-center">
            <span className="text-3xl">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-sm">           Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}
