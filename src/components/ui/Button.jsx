import { forwardRef } from 'react'

const Button = forwardRef(function Button(
  { as = 'button', variant = 'primary', className = '', children, ...props },
  ref
) {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline'
  const Tag = as

  return (
    <Tag ref={ref} className={`${base} ${className}`} {...props}>
      {children}
    </Tag>
  )
})

export default Button
