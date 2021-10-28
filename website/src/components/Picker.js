import { X } from "phosphor-react";

import { useState } from "react";

import clsx from "clsx"

export default function Picker({ options, defaultOptions = [], onChange = () => { } }) {
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions)

  return (
    <div>
      <select selected="-" className={
        clsx(
          "block",
          "w-full",
          "mt-1",
          "rounded-md",
          "border-gray-300",
          "shadow-sm",
          "focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        )}
        onChange={(e) => {
          if (e.target.value !== "-") {
            const newValues = [...selectedOptions, e.target.value]
            setSelectedOptions(newValues)
            onChange(newValues)
          }
        }}
      >
        {options.filter(v => !selectedOptions.includes(v)).map((v, idx) => (
          <option key={idx}>{v}</option>
        ))}
      </select>

      <div className="pt-2 select-none">
        {selectedOptions.sort().map((option, idx) => (
          <div key={idx}>
            <div className={clsx(
              "inline-flex",
              "items-center",
              "px-3", "py-1",
              "text-xs", "font-bold", "leading-sm",
              "bg-indigo-200", "text-indigo-700", "rounded-full"
            )}>
              <span className="pr-1">
                {option}
              </span>
              <span className="cursor-pointer" onClick={() => {
                const newValues = selectedOptions.filter(v => v !== option)
                setSelectedOptions(newValues)
                onChange(newValues)
              }}>
                <X size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}