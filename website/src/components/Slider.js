import { useState } from "react"

export default function Slider({ defaultValue, min, max, step, onChange }) {
    const [value, setValue] = useState(defaultValue)
    return (
        <div className="range-slider">
            <input className="range-slider__range" type="range" value={value} min={min} max={max} step={step} onChange={(val) => {
                const newValue = val.target.value
                setValue(newValue)
                onChange(newValue)
            }}/>
        </div>
    )
}