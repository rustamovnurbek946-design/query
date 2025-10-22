import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-sm mx-auto bg-[#2b3447] rounded-lg p-6 text-gray-300 font-sans  shadow-lg mt-40 ">
      <div className="flex items-center mb-6">
        <div className="relative w-16 h-16 rounded-full bg-black flex items-center justify-center  mr-4">
          <span className="text-xl"></span>
        </div>
        <div className="text-blue-500 font-semibold text-sm">🐱 в сети</div>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <span className="text-gray-500 block mb-1">Телефон</span>
          +998 90 689 12 34
        </div>

        <div>
          <span className="text-gray-500 block mb-1">Про себя</span>
          —
        </div>

        <div>
          <span className="text-gray-500 block mb-1">День рождения</span>
          4 июн
        </div>

        <div>
          <span className="text-blue-500 cursor-pointer">Открыто</span> — круглосуточно
        </div>
      </div>
    </div>
  );
};

export default Profile;
