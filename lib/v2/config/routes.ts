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
  /** In-page section anchor, absolute so it works from other pages too. */
  anchor: (id: string) => `${home}#${id}`,
  /** The projects index — lists every project. */
  projects: `${BASE_PATH}/projects` || "/projects",
  /** A project's case-study page. */
  project: (slug: string) => `${BASE_PATH}/projects/${slug}`,
  /** The writing / blog index. */
  blog: `${BASE_PATH}/blog` || "/blog",
  /** The résumé — reuses the existing standalone route. */
  resume: "/resume",
} as const;
