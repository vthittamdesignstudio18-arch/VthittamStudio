/**
 * Validation rules for the quote form.
 *
 * Kept separate from both the field schema and the page so the rules can be
 * reasoned about (and unit tested) on their own, and so the page stays a
 * rendering concern.
 *
 * The form is submitted with `noValidate`: the browser's native bubbles are
 * unstyled, worded differently in every engine, disappear on scroll and only
 * ever show one message at a time. Validating here means every problem is
 * shown at once, in the studio's own voice, in markup screen readers can reach.
 */

/** Digits only — what actually matters in a phone number. */
const digitsOf = (value) => value.replace(/\D/g, '')

/**
 * Deliberately permissive on shape, strict on substance. Indian mobile and
 * landline numbers are written a dozen different ways (+91, 0, spaces,
 * hyphens, brackets) and rejecting a real number is far worse than accepting
 * an unusual format. What it will not accept is text, or a digit count no
 * telephone number has.
 */
export function validatePhone(value) {
  const digits = digitsOf(value)
  if (/[A-Za-z]/.test(value)) return 'Please enter a phone number, not text.'
  if (digits.length < 10) return 'Please enter a complete phone number (at least 10 digits).'
  if (digits.length > 15) return 'That phone number looks too long — please check it.'
  return null
}

/**
 * One @, something either side, a dot in the domain, no spaces. Anything
 * stricter starts rejecting valid addresses; the real proof an address works
 * is whether the reply arrives.
 */
export function validateEmail(value) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return 'Please enter a valid email address, for example name@example.com.'
  }
  return null
}

/** Optional field, but if it is filled it should contain a figure. */
export function validateArea(value) {
  if (!value.trim()) return null
  if (!/\d/.test(value)) return 'Please include a number, for example 2400.'
  return null
}

export function validateName(value) {
  if (value.trim().length < 2) return 'Please enter your name.'
  return null
}

/** Field name -> validator. Fields absent from this map have no format rule. */
export const fieldValidators = {
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  area: validateArea,
}

/**
 * Validates one field against its schema entry.
 * Returns an error string, or null when the value is acceptable.
 */
export function validateField(field, value) {
  const trimmed = (value ?? '').trim()

  if (field.required && !trimmed) {
    return `${field.label} is required.`
  }

  // An empty optional field is valid; only run format rules on real input.
  if (!trimmed) return null

  return fieldValidators[field.name]?.(trimmed) ?? null
}

/**
 * Validates the whole form.
 * Returns `{ [fieldName]: message }`, empty when everything passes.
 */
export function validateQuote(fields, values) {
  const errors = {}
  for (const field of fields) {
    const message = validateField(field, values[field.name])
    if (message) errors[field.name] = message
  }
  return errors
}
