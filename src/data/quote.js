/**
 * Field schema for the quote request form. Rendered generically by
 * QuotePage so the form stays declarative and easy to extend.
 */
export const quoteFields = [
  { name: 'name', label: 'Full Name', control: 'input', type: 'text', autoComplete: 'name' },
  { name: 'phone', label: 'Phone Number', control: 'input', type: 'tel', autoComplete: 'tel', inputMode: 'tel' },
  { name: 'email', label: 'Email Address', control: 'input', type: 'email', autoComplete: 'email', inputMode: 'email' },
  {
    name: 'projectType',
    label: 'Project Type',
    control: 'select',
    options: [
      'Residential — New Build',
      'Residential — Renovation',
      'Villa / Farmhouse',
      'Apartment Interior',
      'Commercial / Office',
      'Retail / Hospitality',
      'Industrial / Warehouse',
      'Interior Design Only',
    ],
  },
  { name: 'location', label: 'Project Location', control: 'input', type: 'text', autoComplete: 'address-level2' },
  { name: 'area', label: 'Estimated Built-up Area (sq ft)', control: 'input', type: 'text' },
  {
    name: 'budget',
    label: 'Budget Range',
    control: 'select',
    options: [
      'Under ₹25 Lakhs',
      '₹25 – 50 Lakhs',
      '₹50 Lakhs – 1 Crore',
      '₹1 – 2 Crore',
      'Above ₹2 Crore',
      'Yet to be decided',
    ],
  },
  {
    name: 'timeline',
    label: 'Project Timeline',
    control: 'select',
    options: [
      'Ready to start immediately',
      'Within 3 months',
      '3 – 6 months',
      '6 – 12 months',
      'Still exploring',
    ],
  },
  {
    name: 'message',
    label: 'Tell us about your project',
    control: 'textarea',
    required: false,
    full: true,
  },
]

export const quoteSteps = [
  {
    code: 'Q-01',
    title: 'We review your brief',
    description: 'Your requirement, site and budget are studied by a principal architect, not a sales desk.',
  },
  {
    code: 'Q-02',
    title: 'A call within one working day',
    description: 'We walk you through feasibility, indicative cost and the drawings your project will need.',
  },
  {
    code: 'Q-03',
    title: 'A written proposal',
    description: 'Scope, stage-wise deliverables and a transparent fee — issued before any commitment.',
  },
]

export const initialQuoteValues = Object.fromEntries(
  quoteFields.map((field) => [field.name, ''])
)
