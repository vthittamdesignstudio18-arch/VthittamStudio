import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Shared underline form controls used by the Quote page, so the studio's field
 * styling lives in exactly one place.
 *
 * Accessibility notes:
 *  • The floating label is a real <label htmlFor>, not a placeholder, so it
 *    stays announced and stays visible once a value is entered.
 *  • Required fields are marked for assistive tech (aria-required) and
 *    visually (an asterisk with an accessible name), rather than relying on
 *    the browser's silent `required` attribute alone.
 *  • autoComplete tokens let password managers and mobile keyboards fill
 *    these correctly — also a Lighthouse best-practices check.
 *  • A validation message is rendered into the markup, tied to its input by
 *    aria-describedby and flagged with aria-invalid, so a screen reader
 *    announces the problem when the field takes focus. The form is submitted
 *    with noValidate precisely so these replace the browser's native bubbles,
 *    which are unstyled, worded differently in every engine and vanish on
 *    scroll.
 *
 * Layout note: the control, its label and the select chevron share an inner
 * wrapper, and the message sits outside it. An absolutely positioned chevron
 * would otherwise be dragged out of place the moment a message appeared and
 * changed the field's height.
 */
const control =
  'peer w-full bg-transparent border-b pt-6 pb-2 text-ink outline-none transition-colors duration-300'

const borderFor = (error) =>
  error ? 'border-red-600 focus:border-red-700' : 'border-ink/30 focus:border-ink'

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

/**
 * The message is not wrapped in a live region: the field itself receives focus
 * on a failed submit, and aria-describedby means the message is announced as
 * part of that field. A live region as well would say it twice.
 */
function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-xs leading-relaxed text-red-700">
      {message}
    </p>
  )
}

/** Shared wiring so all three controls describe themselves identically. */
function useFieldState(value, error, name) {
  const [focused, setFocused] = useState(false)
  return {
    setFocused,
    floated: focused || value.length > 0,
    errorId: `${name}-error`,
    aria: {
      'aria-invalid': error ? 'true' : undefined,
      'aria-describedby': error ? `${name}-error` : undefined,
    },
  }
}

/** Fires the parent's blur handler and drops the floating-label focus state. */
const blurHandler = (setFocused, onBlur) => (event) => {
  setFocused(false)
  onBlur?.(event)
}

export function FloatingInput({
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error = '',
  required = true,
  autoComplete,
  inputMode,
}) {
  const { setFocused, floated, errorId, aria } = useFieldState(value, error, name)

  return (
    <div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={blurHandler(setFocused, onBlur)}
          required={required}
          aria-required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          {...aria}
          className={`${control} ${borderFor(error)}`}
        />
        <Label name={name} label={label} floated={floated} required={required} />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function FloatingSelect({
  name,
  label,
  value,
  onChange,
  onBlur,
  error = '',
  options = [],
  required = true,
  autoComplete,
}) {
  const { setFocused, floated, errorId, aria } = useFieldState(value, error, name)

  return (
    <div>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={blurHandler(setFocused, onBlur)}
          required={required}
          aria-required={required}
          autoComplete={autoComplete}
          {...aria}
          className={`${control} ${borderFor(error)} appearance-none cursor-pointer pr-8`}
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
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function FloatingTextarea({
  name,
  label,
  value,
  onChange,
  onBlur,
  error = '',
  rows = 4,
  required = false,
  autoComplete,
}) {
  const { setFocused, floated, errorId, aria } = useFieldState(value, error, name)

  return (
    <div>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={blurHandler(setFocused, onBlur)}
          required={required}
          aria-required={required}
          autoComplete={autoComplete}
          {...aria}
          className={`${control} ${borderFor(error)} resize-none`}
        />
        <Label name={name} label={label} floated={floated} required={required} />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  )
}
