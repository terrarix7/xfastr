import React from "react";
import SignUpButton from "./button";

function page() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
          </div>
          <SignUpButton />
        </div>
      </div>
    </div>
  );
}

export default page;
