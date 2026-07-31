import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Shared underline form controls used by both the Contact section and the
 * Quote page, so the studio's field styling lives in exactly one place.
 *
 * Accessibility notes:
 *  • The floating label is a real <label htmlFor>, not a placeholder, so it
 *    stays announced and stays visible once a value is entered.
 *  • Required fields are marked for assistive tech (aria-required) and
 *    visually (an asterisk with an accessible name), rather than relying on
 *    the browser's silent `required` attribute alone.
 *  • autoComplete tokens let password managers and mobile keyboards fill
 *    these correctly — also a Lighthouse best-practices check.
 */
const control =
  'peer w-full bg-transparent border-b border-ink/30 pt-6 pb-2 text-ink outline-none focus:border-ink focus-visible:border-ink transition-colors duration-300'

function Label({ name, label, floated, required }) {
  return (
    <label
      htmlFor={name}
      className={`absolute left-0 transition-all duration-300 pointer-events-none ${
        floated ? 'top-0 text-xs text-ink-muted' : 'top-5 text-base text-ink-muted'
      }`}
    >
      {label}
      {required && (
        <>
          <span aria-hidden="true" className="text-clay-700 ml-0.5">*</span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
  )
}

export function FloatingInput({
  name,
  label,
  type = 'text',
  value,
  onChange,
  required = true,
  autoComplete,
  inputMode,
}) {
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
        aria-required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={control}
      />
      <Label name={name} label={label} floated={floated} required={required} />
    </div>
  )
}

export function FloatingSelect({
  name,
  label,
  value,
  onChange,
  options = [],
  required = true,
  autoComplete,
}) {
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
        aria-required={required}
        autoComplete={autoComplete}
        className={`${control} appearance-none cursor-pointer pr-8`}
      >
        <option value="" disabled hidden />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Label name={name} label={label} floated={floated} required={required} />
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="absolute right-0 bottom-3 text-ink-muted pointer-events-none"
      />
    </div>
  )
}

export function FloatingTextarea({
  name,
  label,
  value,
  onChange,
  rows = 4,
  required = false,
  autoComplete,
}) {
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
        aria-required={required}
        autoComplete={autoComplete}
        className={`${control} resize-none`}
      />
      <Label name={name} label={label} floated={floated} required={required} />
    </div>
  )
}
