"use client";
import React, { useRef, useEffect } from "react";

type Props = {
  length?: number;
  values: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
};

const TextInputGroup = ({
  length = 6,
  values,
  onChange,
  disabled = false,
}: Props) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Clear inputs when values are reset
  useEffect(() => {
    if (values.every((v) => v === "")) {
      inputsRef.current.forEach((input) => {
        if (input) input.value = "";
      });
      inputsRef.current[0]?.focus();
    }
  }, [values]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { value } = e.target;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newValues = [...values];
    newValues[idx] = value;
    onChange(newValues);

    // Auto focus to next input
    if (value.length === 1 && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (!e.currentTarget.value && idx > 0) {
        // Focus previous input and clear it
        const newValues = [...values];
        newValues[idx - 1] = "";
        onChange(newValues);
        inputsRef.current[idx - 1]?.focus();
      } else if (e.currentTarget.value) {
        // Clear current input
        const newValues = [...values];
        newValues[idx] = "";
        onChange(newValues);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      // Trigger form submit
      const form = e.currentTarget.closest("form");
      if (form) {
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length > 0) {
      const newValues = [...values];
      for (let i = 0; i < Math.min(pastedData.length, length); i++) {
        newValues[i] = pastedData[i] || "";
      }
      onChange(newValues);

      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          disabled={disabled}
          value={values[idx] || ""}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className={`
            sm:w-14 sm:h-14 w-12 h-12 
            text-center border-2 rounded-lg 
            text-lg font-bold text-gray-900
            transition-all duration-200
            ${
              disabled
                ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                : "border-gray-300 bg-white hover:border-pink-300"
            }
            ${values[idx] ? "border-pink-400 bg-pink-50" : ""}
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
          `}
          placeholder="•"
        />
      ))}
    </div>
  );
};

export default TextInputGroup;
