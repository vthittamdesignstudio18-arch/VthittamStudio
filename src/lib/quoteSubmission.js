/**
 * Sends quote requests to the studio inbox via Web3Forms — a hosted
 * form-to-email API, so no backend server is needed for a static Vite build.
 *
 * Setup (one-time):
 *   1. https://web3forms.com/  →  enter the studio inbox that should receive
 *      requests and verify it.
 *   2. Web3Forms emails back an access key.
 *   3. Put that key in a `.env` file at the project root (see .env.example):
 *        VITE_WEB3FORMS_KEY=your-key-here
 *   4. Restart `npm run dev` — Vite only reads .env on startup.
 *
 * IMPORTANT — production. Vite inlines this value at build time, so a `.env`
 * file on a developer's machine has no bearing on the deployed site. The key
 * must be set in the host's own environment variables (on Vercel:
 * Settings → Environment Variables → Production) and the site redeployed
 * afterwards. Setting the variable without redeploying changes nothing.
 * scripts/postbuild.mjs fails a CI build when it is missing, so a deploy can
 * no longer silently ship a form that discards every enquiry.
 *
 * The key is not a secret. It is designed to sit in client-side code and
 * only acts as a mailing alias for your inbox.
 */

const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export const isQuoteSubmissionConfigured = Boolean(ACCESS_KEY)

/**
 * @param {Record<string, string>} values - quote form field values
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function submitQuoteRequest(values) {
  // Backstop. QuotePage checks isQuoteSubmissionConfigured up front and hides
  // the submit button entirely, so reaching here means something unusual — the
  // visitor still gets plain English and the hint still goes to the console.
  if (!ACCESS_KEY) {
    console.warn(
      'VITE_WEB3FORMS_KEY is not set. Add it to .env locally and to the host\'s ' +
        'environment variables in production — see the header of this file.',
    )
    return {
      ok: false,
      error: 'We could not send your request just now. Please try again in a moment, or call the studio directly.',
    }
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `New quote request — ${values.name || 'Website enquiry'}`,
        from_name: 'V Thittam Design Studio — Quote Form',
        name: values.name,
        phone: values.phone,
        email: values.email,
        project_type: values.projectType,
        project_location: values.location,
        estimated_area: values.area,
        budget: values.budget,
        timeline: values.timeline,
        message: values.message,
        botcheck: values.botcheck, // honeypot — real users never fill this in
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      return { ok: false, error: result.message || 'The request could not be sent. Please try again.' }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error — please check your connection and try again.' }
  }
}
