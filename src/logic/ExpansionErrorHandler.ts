/** Structured error thrown when a character expansion section fails. */
export class ExpansionSectionError extends Error {
  readonly section: string

  constructor(section: string, cause: unknown) {
    super(`Failed to generate expansion section: ${section}`, { cause })
    this.name = 'ExpansionSectionError'
    this.section = section
  }
}

function shouldReportExpansionErrors(): boolean {
  return Boolean(import.meta.env?.DEV && import.meta.env.MODE !== 'test')
}

/** Reports a section failure in development without interrupting character generation. */
export function reportExpansionError(error: ExpansionSectionError): void {
  if (!shouldReportExpansionErrors()) return

  console.warn('[Aetheris] Expansion section fallback used.', {
    section: error.section,
    cause: error.cause,
  })
}

/**
 * Runs one expansion section with an isolated fallback.
 *
 * Use this at generator boundaries instead of wrapping the whole character
 * generation pipeline. One bad optional data pool should not destroy the
 * complete character, but the failure should still be visible in development.
 */
export function safeGenerateSection<T>(
  section: string,
  createFallback: () => T,
  generate: () => T,
): T {
  try {
    return generate()
  } catch (cause) {
    const error = new ExpansionSectionError(section, cause)
    reportExpansionError(error)
    return createFallback()
  }
}
