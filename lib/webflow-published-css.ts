/**
 * Interim smoke-test only: DevLink export currently ships defaults/normalize/fonts
 * but not STNDRD site classes (.coach-grid, .section_coach, etc.).
 * Load the same shared CSS Webflow publishes until DevLink bundles class rules.
 * Re-pin when Webflow republishes (check /protocol <link rel="stylesheet">).
 */
export const WEBFLOW_PUBLISHED_SHARED_CSS =
  'https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/css/stndrd-coaching.webflow.shared.978c412cb.css';
