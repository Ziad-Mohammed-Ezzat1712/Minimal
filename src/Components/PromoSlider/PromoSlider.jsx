import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../../Context/LanguageContext'; // تأكد من المسار الصحيح

export default function PromoSlider() {
  const { isArabic } = useContext(LanguageContext);

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // وقت انتهاء العرض (مثلاً بعد 160000 ثانية)
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

  const texts = {
    title: isArabic ? "⚡عرض لفترة محدودة!" : "⚡Limited Time Offer!",
    description: isArabic ? " !احصل على 5 قطع مقابل 500 جنيه   " : "Get 5 for 500 EGP!",
    hours: isArabic ? "ساعات" : "Hours",
    minutes: isArabic ? "دقائق" : "Minutes",
    seconds: isArabic ? "ثواني" : "Seconds",
  };

  return (
    <section className="bg-[#9BC2B0] text-white py-3 px-4 text-center">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{texts.title}</h2>
        <p className="text-sm md:text-base ml-8 mb-4">{texts.description}</p>

        <div className="flex justify-center ml-8 gap-6 text-base md:text-lg font-mono font-semibold">
          <div className="flex flex-col items-center">
            <span className="text-3xl">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-sm">{texts.hours}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-sm">{texts.minutes}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-sm">{texts.seconds}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
