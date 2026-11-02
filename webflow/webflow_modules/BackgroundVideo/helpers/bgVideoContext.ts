"use client";
import React from "react";

export const BgVideoContext = React.createContext<{
  isPlaying: boolean;
  togglePlay: () => void;
}>({ isPlaying: true, togglePlay: () => undefined });
