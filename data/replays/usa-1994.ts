/**
 * Re-export of the manually curated USA 1994 Complete Tournament replay catalog.
 * Production archive application lives in lib/archive; this path matches the
 * data/replays convention requested for source-controlled catalog storage.
 */
export {
  USA_1994_REPLAY_CATALOG,
  USA_1994_JOURNEY_MEMBERSHIP,
  USA_1994_FIFA_VERIFIED_BY,
  USA_1994_DAILYMOTION_VERIFIED_BY,
  type Usa1994ReplayCatalogEntry,
} from "@/lib/archive/usa1994-replay-catalog";
