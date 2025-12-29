"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>Count : {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="p-2 bg-white rounded-2xl text-black hover:bg-gray-400 transition"
      >
        Increment
      </button>
    </>
  );
}
