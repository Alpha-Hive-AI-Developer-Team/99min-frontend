"use client";

import React from 'react';

const SettingsHeader: React.FC = () => {
  return (
    <div className=" bg-white p-4 border-b border-lightGrey">
      <h1 className="text-3xl font-black text-textBlack mb-2">Settings</h1>
      <p className="text-textGray text-base">Manage your account</p>
    </div>
  );
};

export default SettingsHeader;

