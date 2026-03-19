export const APP_NAME = "direktedemokrati.nu";

export const APP_DISPLAY_NAME = "Direkte Demokrati";

export const APP_TAGLINE = "Stem direkte på Folketingets forslag";

export const APP_DESCRIPTION =
  "Mobil-først civic participation web app for anonyme predictive votes.";

export const PRIMARY_PURPLE = "#5B4FCF";
export const PRIMARY_DARK = "#3D329F";
export const BACKGROUND_WARM = "#FFFAF5";
export const SURFACE_WHITE = "#FFFFFF";
export const TEXT_DARK = "#2C2C2C";
export const TEXT_MUTED = "#6B7280";
export const BORDER_COLOR = "#E5E7EB";
export const SURFACE_SUBTLE = "#F3F4F6";
export const VOTE_FOR = "#22A06B";
export const VOTE_AGAINST = "#E34935";
export const ACCENT_ORANGE = "#FF6B35";

export const CARD_SHADOW = "shadow-[0_4px_16px_rgba(0,0,0,0.04)]";
export const CARD_RADIUS = "rounded-2xl";

export const MAX_POSTCODE_LENGTH = 4;

export const DEFAULT_BOTTOM_NAV_ITEMS = ["Vote", "Results", "MPs"] as const;

export const APP_ROUTES = {
  home: "/vote",
  results: "/results",
  mps: "/mps",
  about: "/about",
  constituency: "/find-constituency"
} as const;
