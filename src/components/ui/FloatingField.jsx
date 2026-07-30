import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Shared underline form controls used by both the Contact section and the
 * Quote page, so the studio's field styling lives in exactly one place.
 */
const control =
  'peer w-full bg-transparent border-b border-ink/20 pt-6 pb-2 text-ink outline-none focus:border-ink transition-colors duration-300'

function Label({ name, label, floated }) {
  return (
    <label
      htmlFor={name}
      className={`absolute left-0 transition-all duration-300 pointer-events-none ${
        floated ? 'top-0 text-xs text-ink-muted' : 'top-5 text-base text-ink-muted'
      }`}
    >
      {label}
    </label>
  )
}

export function FloatingInput({ name, label, type = 'text', value, onChange, required = true }) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={control}
      />
      <Label name={name} label={label} floated={floated} />
    </div>
  )
}

export function FloatingSelect({ name, label, value, onChange, options = [], required = true }) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={`${control} appearance-none cursor-pointer pr-8`}
      >
        <option value="" disabled hidden />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Label name={name} label={label} floated={floated} />
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="absolute right-0 bottom-3 text-ink-muted pointer-events-none"
      />
    </div>
  )
}

export function FloatingTextarea({ name, label, value, onChange, rows = 4, required = false }) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={`${control} resize-none`}
      />
      <Label name={name} label={label} floated={floated} />
    </div>
  )
}
