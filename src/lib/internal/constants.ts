/** Number of toasts visible at once before stacking. */
export const VISIBLE_TOASTS_AMOUNT = 3;

/** Viewport offset from screen edges (desktop). */
export const VIEWPORT_OFFSET = '24px';

/** Viewport offset from screen edges (mobile). */
export const MOBILE_VIEWPORT_OFFSET = '16px';

/** Default toast auto-dismiss duration in milliseconds. */
export const DEFAULT_TOAST_DURATION = 4000;

/** Default toast width in pixels. */
export const TOAST_WIDTH = 356;

/** Gap between toasts in pixels. */
export const GAP = 14;

/** Minimum swipe distance (px) required to dismiss a toast. */
export const SWIPE_THRESHOLD = 45;

/** Duration of the exit animation before unmounting (ms). */
export const TIME_BEFORE_UNMOUNT = 200;

/** Scale reduction per stacked toast index. */
export const SCALE_MULTIPLIER = 0.05;

/** Theme identifiers. */
export const DARK = 'dark' as const;
export const LIGHT = 'light' as const;
