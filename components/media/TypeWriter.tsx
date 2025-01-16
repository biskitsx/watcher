"use client";
import TypewriterComponent from "typewriter-effect";

export const TypeWrite = () => {
  return (
    <TypewriterComponent
      options={{
        strings: ["Movies", "Series", "Anime"],
        autoStart: true,
        loop: true,
      }}
    />
  );
};
