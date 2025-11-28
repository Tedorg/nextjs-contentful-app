'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setIsVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 text-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-2">
      <p className="text-gray-800">
        Diese Website verwendet Cookies, um dein Nutzungserlebnis zu verbessern.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
      >
        OK
      </button>
    </div>
  );
}