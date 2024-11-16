import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
        <p>تم تطويره بواسطة فريق الذكاء الاصطناعي © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}