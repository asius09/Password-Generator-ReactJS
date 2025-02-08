import { useState, useCallback, useEffect } from "react";
import { Alert } from "./components/Alert";

function App() {
  const [count, setCount] = useState(0);
  const [maxLength, setMaxLength] = useState(20);
  const [minLenght, setMinLenght] = useState(8);
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("xPPytnA03/o");
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(false);
  const [alert, setAlert] = useState({
    message: "Hello World!",
    textColor: "text-black",
    bgColor: "bg-gray-200",
    top: "-top-15",
  });

  // Renamed and defined the password generator function
  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let data = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    if (numbersAllowed) {
      data = data.concat([..."0123456789"]);
    }
    if (charAllowed) {
      data = data.concat(["!", "@", "#", "$", "&", "*", "_"]);
    }
    for (let i = 0; i < length; i++) {
      generatedPassword += data[Math.floor(Math.random() * data.length)];
    }
    setPassword(generatedPassword);
  }, [length, setPassword, numbersAllowed, charAllowed]);

  const handleLength = (length) => setLength(length);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);

      setAlert({
        message: "Copied successfully!",
        textColor: "text-green-500",
        bgColor: "bg-green-200",
        top: "top-4",
      });
    } catch (err) {
      setAlert({
        message: "Failed to copy.",
        textColor: "text-red-500",
        bgColor: "bg-red-200",
        top: "top-4",
      });
    }
    setTimeout(() => {
      setAlert({
        message: "",
        textColor: "",
        bgColor: "",
        top: "-top-15",
      });
    }, 2000);
  };
  useEffect(() => {
    passwordGenerator();
  }, [length, setPassword, numbersAllowed, charAllowed]);
  return (
    <>
      <Alert
        message={alert.message}
        textColor={alert.textColor}
        bgColor={alert.bgColor}
        top={alert.top}
      />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white text-black p-6 rounded-xl shadow-md flex flex-col gap-6">
          {/* Password Display Section */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              readOnly
              value={password}
              className="w-full flex-1 min-w-0 border-2 border-gray-300 rounded-xl bg-transparent py-2 px-4 text-black outline-none"
            />
            <button
              className="w-full md:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 focus:outline-none font-semibold rounded-xl text-base px-6 py-2 transition-colors duration-200"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>

          {/* Generator Controls Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
            {/* Length Slider */}
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              <input
                type="range"
                name="length"
                id="length"
                className="w-full"
                max={maxLength}
                min={minLenght}
                value={length}
                onChange={(e) => handleLength(e.target.value)}
              />
              <span id="length-value" className="whitespace-nowrap">
                Length ({length})
              </span>
            </div>
            {/* Options for Numbers and Special Characters */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="numbers"
                  id="numbers"
                  checked={numbersAllowed}
                  onChange={(e) => setNumbersAllowed(e.target.checked)}
                  className="h-4 w-4"
                />
                Numbers
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="characters"
                  id="characters"
                  checked={charAllowed}
                  onChange={(e) => setCharAllowed(e.target.checked)}
                  className="h-4 w-4"
                />
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
