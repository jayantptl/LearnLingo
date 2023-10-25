import React from "react";

const Loading = () => {
  return (
    <div class="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]flex items-center justify-center">
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
        <div class="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin border-solid border-t border-gray-900"></div>
      </div>
    </div>
  );
};

export default Loading;
