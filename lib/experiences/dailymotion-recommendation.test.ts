import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MatchExperienceModal } from "@/components/experiences/MatchExperienceModal";
import { seasons } from "@/data/seasons";
import {
  UBLOCK_ORIGIN_URL,
  getPreferredReplayForEpisode,
  shouldShowDailymotionRecommendation,
} from "@/lib/replays";
import { getExperienceByRoute, resolveExperienceEpisodes } from "./index";

const DAILYMOTION_SPOILER =
  "⚠ Avoid reading comments or recommended videos if you wish to remain spoiler-free.";

function noop() {}

function renderEpisodeModal(canonicalMatchId: string) {
  const experience = getExperienceByRoute("france-1998", "every-match");
  assert.ok(experience);
  const episode = resolveExperienceEpisodes(experience).find(
    (ep) => ep.canonicalMatchId === canonicalMatchId
  );
  assert.ok(episode, `missing episode ${canonicalMatchId}`);
  const season = seasons.find((s) => s.id === "france-1998")!;

  const replay = getPreferredReplayForEpisode(episode);
  const html = renderToStaticMarkup(
    createElement(MatchExperienceModal, {
      episode,
      experience,
      tournamentName: season.name,
      completed: false,
      prev: null,
      next: null,
      standings: null,
      onClose: noop,
      onToggleComplete: noop,
      onOpen: noop,
      onBackToList: noop,
      onBackToExperienceHome: noop,
    })
  );

  return { html, replay, episode };
}

describe("Dailymotion viewing recommendation", () => {
  it("detects Dailymotion from replay provider metadata", () => {
    assert.equal(
      shouldShowDailymotionRecommendation({
        url: "https://www.dailymotion.com/video/x9ptcza",
        provider: "Dailymotion",
      }),
      true
    );
    assert.equal(
      shouldShowDailymotionRecommendation({
        url: "https://www.fifa.com/en/watch/example",
        provider: "FIFA",
      }),
      false
    );
    assert.equal(shouldShowDailymotionRecommendation(null), false);
  });

  it("shows the recommendation for Dailymotion-hosted matches", () => {
    const { html, replay } = renderEpisodeModal("france-1998-c09");
    assert.equal(replay?.provider, "Dailymotion");
    assert.equal(shouldShowDailymotionRecommendation(replay), true);
    assert.match(html, /data-testid="dailymotion-recommendation"/);
    assert.match(html, /data-replay-provider="Dailymotion"/);
    assert.match(
      html,
      /This replay is hosted on Dailymotion\. For the best viewing experience, we recommend/
    );
    assert.match(
      html,
      /as Dailymotion can contain intrusive advertisements\./
    );
    assert.match(html, new RegExp(DAILYMOTION_SPOILER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, /▶ Full Match/);
    assert.match(html, /Watch the Match/);
  });

  it("links only the words uBlock Origin with secure new-tab attributes", () => {
    const { html } = renderEpisodeModal("france-1998-c09");
    assert.match(
      html,
      new RegExp(
        `<a href="${UBLOCK_ORIGIN_URL}" target="_blank" rel="noopener noreferrer" aria-label="Open the official uBlock Origin website in a new tab.">uBlock Origin</a>`
      )
    );
    assert.equal(UBLOCK_ORIGIN_URL, "https://ublockorigin.com/");
    // Surrounding sentence must not be wrapped in the same anchor.
    assert.doesNotMatch(
      html,
      /<a[^>]*>This replay is hosted on Dailymotion/
    );
  });

  it("does not show the recommendation for FIFA-hosted matches", () => {
    const experience = getExperienceByRoute("france-1998", "story");
    assert.ok(experience);
    const episodes = resolveExperienceEpisodes(experience);
    const fifaEpisode = episodes.find((ep) => {
      const replay = getPreferredReplayForEpisode(ep);
      return replay?.provider === "FIFA";
    });
    assert.ok(fifaEpisode, "expected a FIFA story episode");

    const season = seasons.find((s) => s.id === "france-1998")!;
    const replay = getPreferredReplayForEpisode(fifaEpisode);
    assert.equal(replay?.provider, "FIFA");
    assert.equal(shouldShowDailymotionRecommendation(replay), false);

    const html = renderToStaticMarkup(
      createElement(MatchExperienceModal, {
        episode: fifaEpisode,
        experience,
        tournamentName: season.name,
        completed: false,
        prev: null,
        next: null,
        standings: null,
        onClose: noop,
        onToggleComplete: noop,
        onOpen: noop,
        onBackToList: noop,
        onBackToExperienceHome: noop,
      })
    );

    assert.doesNotMatch(html, /data-testid="dailymotion-recommendation"/);
    assert.doesNotMatch(html, /hosted on Dailymotion/);
    assert.doesNotMatch(html, /uBlock Origin/);
    assert.match(html, /▶ Full Match/);
    // Official FIFA highlights coexist with Full Match; CTA label stays "Highlights".
    assert.match(html, /data-watch-kind="official-highlights"/);
    assert.match(html, />▶ Highlights</);
    assert.doesNotMatch(html, /Official FIFA Highlights|Extended Highlights/);
    assert.doesNotMatch(html, /data-testid="highlights-coming-soon"/);
  });
});
