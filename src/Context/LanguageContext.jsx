import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [isArabic, setIsArabic] = useState(true);

  // جلب اللغة المخزنة عند بداية التحميل
  useEffect(() => {
    const savedLang = localStorage.getItem("isArabic");
    if (savedLang !== null) setIsArabic(savedLang === "true");
  }, []);

  // تخزين اللغة عند التغيير
  useEffect(() => {
    localStorage.setItem("isArabic", isArabic);
  }, [isArabic]);

  const toggleLanguage = () => setIsArabic(prev => !prev);

  return (
    <LanguageContext.Provider value={{ isArabic, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
