import { useState } from "react";
import useDarkMode from "./useDarkMode";

function ToggleButton() {
  const [, setTheme] = useDarkMode();
  var x = typeof window !== "undefined" ? localStorage.theme : "light";
  const [isDark, setIsDark] = useState(x === "dark");
  function toggleDarkModeButton(e: boolean) {
    e ? setTheme("dark") : setTheme("light");
    setIsDark(e);
  }
  return (
    <div className="mt-4 ml-4">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="toggleB"
            className="sr-only"
            onChange={(e) => toggleDarkModeButton(e.target.checked)}
          />
          <div className="block bg-gray-700 w-10 h-6 rounded-full"></div>
          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
        </div>
        <div className="ml-3 dark:text-gray-50">Dark Mode</div>
      </label>
    </div>
  );
}

export default ToggleButton;
