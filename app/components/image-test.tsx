import { useState, useRef, useEffect } from "react";
import { Image } from "./image";

export const ImageTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const renderCountRef = useRef(0);

  // Increment the counter on each render (for debug purposes only)
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // To open/close the module
  const toggleModule = () => {
    setIsOpen(!isOpen);
  };

  // To increment the counter (to see the component re-render)
  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-gray-50 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Image Optimization Test Component</h2>
        <p className="text-gray-600">
          This component is used to test Image optimization.
        </p>
        <div className="flex flex-col gap-1 text-sm">
          <div className="rounded bg-blue-50 p-2">
            Render Count (State): <span className="font-bold">{counter}</span>
          </div>
          <div className="rounded bg-green-50 p-2">
            Total Render Count:{" "}
            <span className="font-bold">{renderCountRef.current}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleModule}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          {isOpen ? "Close Module" : "Open Module"}
        </button>

        <button
          onClick={incrementCounter}
          className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Re-render Component
        </button>
      </div>

      {isOpen && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Image Module</h3>

          <div className="flex flex-col gap-6">
            {/* Normal Image usage (debug on) */}
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Standard Image (debug on):
              </p>
              <Image
                debug={false}
                priority={false}
                loading="lazy"
                placeholderSrc="https://images.project-test.info/8-blur.webp"
                src="https://images.project-test.info/8.webp"
                alt="Test Image 1"
                width={256}
                height={256}
                className="object-cover"
              />
            </div>

            {/* Image with priority enabled */}
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Priority Image (priority=true): This image will be loaded with
                high priority, bypassing the placeholder image and directly
                downloading the main image for faster display.
              </p>
              <Image
                debug={false}
                priority={false}
                loading="lazy"
                placeholderSrc="https://images.project-test.info/5-blur.webp"
                src="https://images.project-test.info/5.webp"
                alt="Test Image 2"
                width={256}
                height={256}
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-4 rounded bg-yellow-50 p-3 text-sm text-yellow-800">
            <p>
              <strong>Test Steps:</strong>
            </p>
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              <li>Open the module (images will load)</li>
              <li>Close the module</li>
              <li>Reopen the module (images should come from cache)</li>
              <li>
                Press the "Re-render" button (only the counter should increase,
                images should not reload)
              </li>
              <li>
                There should be no infinite loop warnings in the browser console
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
