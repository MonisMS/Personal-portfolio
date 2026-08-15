/**
 * Single source of truth for the v2 URL base.
 *
 * Everything routes through here so `/v2` is never hardcoded in a component.
 * Cutover to the bare domain (m0nis.com/) is then a ONE-LINE change: set
 * `BASE_PATH` to "" and move the `app/v2/*` files up to `app/*`.
 */
export const BASE_PATH = "/v2";

/** The home path — "/v2" today, "/" after cutover. */
const home = BASE_PATH || "/";

export const routes = {
  home,
  /** In-page section anchor, absolute so it works from case-study pages too. */
  anchor: (id: string) => `${home}#${id}`,
  /** A project's case-study page. */
  project: (slug: string) => `${BASE_PATH}/projects/${slug}`,
} as const;
