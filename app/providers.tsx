"use client"

import React from 'react';
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
        <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </SessionProvider>
  );
}