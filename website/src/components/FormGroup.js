import { useState } from "react";
import useStore from "../lib/store";

function Checkbox({ label, isChecked, onCheckboxChange }) {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-5"
        checked={isChecked}
        name={label}
        onChange={onCheckboxChange}
      />
      <span className="ml-2">{label}</span>
    </label>
  )
}

export default function FormGroup({ groupName, prettyName, options }) {
  const setCheckbox = useStore(state => state.setCheckbox)
  const localState = useStore(state => ({ ...state[groupName] }))

  const [allChecked, setAllChecked] = useState(false)

  return (
    <div className="mb-4">
      <span className="text-gray-700 font-medium">{prettyName}</span>
      <div className="mt-2">
        <div>
            <Checkbox
              label="All"
              isChecked={allChecked}
              onCheckboxChange={(e) => options.map((option) => {
                setCheckbox(groupName, option, !allChecked)
                setAllChecked(!allChecked)
              })}
              key={groupName + "-all"}
            />
        </div>
        {options.map((option) => (
          <div>
            <Checkbox
              label={option}
              isChecked={localState[option]}
              onCheckboxChange={(e) => setCheckbox(groupName, e.target.name, !localState[e.target.name])}
              key={groupName + "-" + option}
            />
          </div>
        ))}
      </div>
    </div>
  );
}