import { X } from "phosphor-react";

import { useState } from "react";

export default function Picker({ options }) {
  const [selectedOptions, setSelectedOptions] = useState([])

  return (
    <div>
      <select selected="-" className="
                    block
                    w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " onChange={(e) => {
          if (e.target.value !== "-")
            setSelectedOptions([...selectedOptions, e.target.value]);
        }}>
        {options.filter(v => !selectedOptions.includes(v)).map((v, idx) => (
          <option key={idx}>{v}</option>
        ))}
      </select>

      <div className="pt-2 select-none">
        {selectedOptions.map((option, idx) => (
          <div key={idx} class="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-indigo-200 text-indigo-700 rounded-full">
            <span className="pr-1">
              {option}
            </span>
            <span className="cursor-pointer" onClick={() => setSelectedOptions(selectedOptions.filter(v => v !== option))}>
              <X size={16} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}