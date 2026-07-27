"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SendFeedbackButton } from "@/components/feedback/SendFeedbackButton";
import { SiteFooter } from "@/components/feedback/SiteFooter";
import { SiteNav } from "@/components/home/SiteNav";
import { HERO_ARCHIVE_IMAGES } from "@/lib/home";
import {
  ARCHIVE_HORIZON,
  OUR_STORY_TITLE,
  getArchiveTimeline,
} from "@/lib/our-story";

type OurStoryPageProps = {
  onNavigateHome: () => void;
  onBrowseArchive: () => void;
  onWorldCups: () => void;
  onSelectTournament?: (href: string) => void;
};

const HERO_IMAGE =
  HERO_ARCHIVE_IMAGES.find((image) => image.id === "packed-stands") ??
  HERO_ARCHIVE_IMAGES[0]!;

const PRINCIPLES = [
  "No spoilers.",
  "Story over statistics.",
  "Curated, not scraped.",
  "One canonical history.",
  "Built by football supporters.",
  "History deserves context.",
] as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [motionOn, setMotionOn] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setInView(true);
      return;
    }
    setMotionOn(true);
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`our-story-reveal ${className}`.trim()}
      data-motion={motionOn ? "on" : "off"}
      data-inview={inView ? "true" : "false"}
    >
      {children}
    </div>
  );
}

export function OurStoryPage({
  onNavigateHome,
  onBrowseArchive,
  onWorldCups,
  onSelectTournament,
}: OurStoryPageProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timeline = getArchiveTimeline();

  useEffect(() => {
    document.title = OUR_STORY_TITLE;
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="our-story-page" data-testid="our-story-page">
      <SiteNav
        onWorldCups={onWorldCups}
        onScrollToArchive={onBrowseArchive}
        onOurStory={() => {
          window.scrollTo(0, 0);
          titleRef.current?.focus({ preventScroll: true });
        }}
        onBrand={onNavigateHome}
        active="our-story"
      />

      <article className="our-story">
        <header className="our-story-hero">
          <div className="our-story-hero__media" aria-hidden="true">
            {/* Decorative archival image — empty alt via aria-hidden parent */}
            <img
              className="our-story-hero__image"
              src={HERO_IMAGE.src}
              alt=""
              decoding="async"
              fetchPriority="high"
              draggable={false}
              style={{ objectPosition: HERO_IMAGE.focalPosition ?? "center center" }}
            />
            <div className="our-story-hero__fade" />
            <div className="our-story-hero__grain" />
          </div>

          <div className="our-story-hero__content">
            <p className="our-story-eyebrow">Our Story</p>
            <h1
              id="our-story-title"
              ref={titleRef}
              className="our-story-hero__title"
              tabIndex={-1}
            >
              Experience football history as if it were happening today.
            </h1>
            <div className="our-story-hero__body our-story-prose">
              <p>Football history is full of unforgettable moments.</p>
              <p>
                Maradona’s brilliance. Baggio’s heartbreak. Zidane’s artistry.
                Ronaldo’s redemption. Underdogs shocking the world. Heavyweights
                falling sooner than anyone expected.
              </p>
              <p>But for most of us, those stories arrive in reverse.</p>
              <p>
                Before we’ve watched a single match, we already know who wins the
                tournament. We know the iconic goals. We know which nation lifts
                the trophy. The suspense—the very thing that made those
                tournaments unforgettable—has already been lost.
              </p>
              <p>Football Time Machine was built to change that.</p>
              <p>Instead of reading history, we invite you to experience it.</p>
            </div>
            <button
              type="button"
              className="our-story-cta our-story-cta--primary"
              onClick={onBrowseArchive}
            >
              Browse the Archive
            </button>
          </div>
        </header>

        <Reveal>
          <section
            className="our-story-section our-story-why"
            aria-labelledby="our-story-why-heading"
          >
            <div className="our-story-why__aside">
              <h2 id="our-story-why-heading" className="our-story-heading">
                Why Football Time Machine Exists
              </h2>
              <blockquote className="our-story-pullquote">
                <p>Instead of reading history, we invite you to experience it.</p>
              </blockquote>
            </div>
            <div className="our-story-why__copy our-story-prose">
              <p>Imagine discovering the 1994 World Cup for the first time.</p>
              <p>You don’t know whether Brazil finally ends its 24-year wait.</p>
              <p>You don’t know how far Bulgaria will go.</p>
              <p>
                You don’t know which stars will define the tournament—or which
                favorites will disappoint.
              </p>
              <p>Every match matters because every result is still unknown.</p>
              <p>That is the experience Football Time Machine recreates.</p>
              <p>
                Rather than presenting football as a collection of statistics and
                results, we present it as a living story that unfolds one match
                at a time.
              </p>
              <p>
                Whether you’re discovering these tournaments for the first time,
                introducing your children to the beautiful game, or reliving the
                World Cups that shaped your own football memories, Football Time
                Machine is built for you.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-how"
            aria-labelledby="our-story-how-heading"
          >
            <h2 id="our-story-how-heading" className="our-story-heading">
              How It Works
            </h2>
            <p className="our-story-lede our-story-prose">
              There isn’t one correct way to experience football history. Choose
              the path that interests you most and let the tournament unfold.
            </p>

            <ol className="our-story-steps">
              <li className="our-story-step">
                <span className="our-story-step__number" aria-hidden="true">
                  01
                </span>
                <div className="our-story-step__body">
                  <h3 className="our-story-step__title">Choose a Tournament</h3>
                  <div className="our-story-prose">
                    <p>
                      Browse the greatest tournaments in football history,
                      beginning with the FIFA Men’s World Cup.
                    </p>
                    <p>
                      Every tournament has been carefully reconstructed from the
                      opening match to the final whistle.
                    </p>
                  </div>
                </div>
              </li>

              <li className="our-story-step our-story-step--journeys">
                <span className="our-story-step__number" aria-hidden="true">
                  02
                </span>
                <div className="our-story-step__body">
                  <h3 className="our-story-step__title">Choose Your Journey</h3>
                  <ul className="our-story-journeys">
                    <li>
                      <span className="our-story-journeys__label">The Story</span>
                      <p>
                        Experience the defining narrative of a tournament through
                        its most important matches.
                      </p>
                    </li>
                    <li>
                      <span className="our-story-journeys__label">
                        The Essentials
                      </span>
                      <p>
                        A shorter journey featuring the matches that shaped the
                        competition.
                      </p>
                    </li>
                    <li>
                      <span className="our-story-journeys__label">
                        Follow a Team
                      </span>
                      <p>
                        Experience the tournament through the eyes of one nation,
                        from its opening match until its journey ends.
                      </p>
                    </li>
                    <li>
                      <span className="our-story-journeys__label">Every Match</span>
                      <p>
                        Watch the complete tournament in chronological order.
                      </p>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="our-story-step">
                <span className="our-story-step__number" aria-hidden="true">
                  03
                </span>
                <div className="our-story-step__body">
                  <h3 className="our-story-step__title">Experience Every Match</h3>
                  <div className="our-story-prose">
                    <p>
                      Every match begins with only the information supporters
                      would have known at the time.
                    </p>
                    <p>
                      Across the growing archive, matches can include both a full
                      replay and a condensed highlights option, so you can
                      experience football history whether you have 90 minutes or
                      just 9.
                    </p>
                    <p>Before kickoff you’ll discover:</p>
                    <ul>
                      <li>why the match mattered;</li>
                      <li>where each team stood;</li>
                      <li>tournament standings;</li>
                      <li>Team Profiles;</li>
                      <li>key players to watch.</li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="our-story-step">
                <span className="our-story-step__number" aria-hidden="true">
                  04
                </span>
                <div className="our-story-step__body">
                  <h3 className="our-story-step__title">Unlock the Story</h3>
                  <div className="our-story-prose">
                    <p>Only after you’ve finished the match do you unlock:</p>
                    <ul>
                      <li>match reports;</li>
                      <li>key moments;</li>
                      <li>tournament consequences;</li>
                      <li>historical perspective.</li>
                    </ul>
                    <p>
                      History is revealed only after you’ve experienced it.
                    </p>
                  </div>
                </div>
              </li>
            </ol>

            <p className="our-story-how__close our-story-prose">
              No matter which journey you choose, every match shares the same
              editorial content and progress system.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-spoilers"
            aria-labelledby="our-story-spoilers-heading"
          >
            <h2 id="our-story-spoilers-heading" className="our-story-heading">
              Why Spoiler-Free Matters
            </h2>
            <div className="our-story-prose our-story-spoilers__copy">
              <p>
                Sport is one of the few forms of storytelling where nobody knows
                the ending.
              </p>
              <p>
                The tension of a late equalizer. The shock of an upset. The
                pressure of a penalty shootout.
              </p>
              <p>
                Once you know what’s coming, those moments can never quite feel
                the same.
              </p>
              <p>
                Football Time Machine is built to preserve that feeling for
                generations of supporters discovering football history for the
                first time.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-philosophy"
            aria-labelledby="our-story-philosophy-heading"
          >
            <h2 id="our-story-philosophy-heading" className="our-story-heading">
              Our Philosophy
            </h2>
            <ul className="our-story-panels">
              <li className="our-story-panel">
                <h3 className="our-story-panel__title">Spoiler-Free by Design</h3>
                <div className="our-story-prose">
                  <p>
                    Football is at its most compelling when you don’t know what
                    happens next.
                  </p>
                  <p>
                    Everything on Football Time Machine is designed to preserve
                    that feeling.
                  </p>
                  <p>
                    Results, knockout brackets, tournament summaries and future
                    opponents remain hidden until you’ve earned them.
                  </p>
                </div>
              </li>
              <li className="our-story-panel">
                <h3 className="our-story-panel__title">Story Before Statistics</h3>
                <div className="our-story-prose">
                  <p>Statistics explain what happened.</p>
                  <p>Stories explain why it mattered.</p>
                  <p>
                    Our goal isn’t simply to catalogue football history. It’s to
                    help you understand why generations of supporters still talk
                    about these tournaments decades later.
                  </p>
                </div>
              </li>
              <li className="our-story-panel">
                <h3 className="our-story-panel__title">One Match at a Time</h3>
                <div className="our-story-prose">
                  <p>Football tournaments weren’t experienced all at once.</p>
                  <p>Neither should they be today.</p>
                  <p>
                    Every match builds tension. Every upset changes expectations.
                    Every victory means something because you don’t yet know
                    what’s waiting around the corner.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-replays"
            aria-labelledby="our-story-replays-heading"
          >
            <h2 id="our-story-replays-heading" className="our-story-heading">
              Match Replays
            </h2>
            <div className="our-story-prose our-story-replays__copy">
              <p>
                Football Time Machine doesn’t host match footage directly.
              </p>
              <p>
                Instead, we curate the best publicly available replay sources,
                prioritizing official providers whenever possible.
              </p>
              <p>
                As football archives continue to evolve, replay availability may
                occasionally change. We continually update the archive to provide
                the best possible viewing experience.
              </p>
              <p className="our-story-note">
                Football Time Machine is not affiliated with FIFA, Dailymotion or
                any other replay provider unless explicitly stated.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-archive"
            aria-labelledby="our-story-archive-heading"
          >
            <h2 id="our-story-archive-heading" className="our-story-heading">
              The Archive
            </h2>
            <p className="our-story-lede our-story-prose">
              The archive is only beginning.
            </p>

            <ol className="our-story-timeline">
              {timeline.map((item) => {
                const content = (
                  <>
                    <span className="our-story-timeline__year">{item.year}</span>
                    <span className="our-story-timeline__host">{item.host}</span>
                    <span
                      className={`our-story-timeline__status our-story-timeline__status--${item.status}`}
                    >
                      {item.statusLabel}
                    </span>
                  </>
                );

                return (
                  <li
                    key={`${item.year}-${item.host}`}
                    className={`our-story-timeline__item our-story-timeline__item--${item.status}`}
                    data-status={item.status}
                    data-year={item.year}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="our-story-timeline__link"
                        aria-label={`${item.host} ${item.year}, ${item.statusLabel}`}
                        onClick={(event) => {
                          if (!onSelectTournament) return;
                          event.preventDefault();
                          onSelectTournament(item.href!);
                        }}
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        className="our-story-timeline__row"
                        aria-label={`${item.host} ${item.year}, ${item.statusLabel}`}
                      >
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="our-story-horizon">
              <p className="our-story-horizon__label">On the Horizon</p>
              <p className="our-story-prose our-story-horizon__intro">
                Beyond the Men’s World Cup, we are building toward:
              </p>
              <ul className="our-story-horizon__list">
                {ARCHIVE_HORIZON.map((item) => (
                  <li key={item.label}>{item.label}</li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-creator"
            aria-labelledby="our-story-creator-heading"
          >
            <h2 id="our-story-creator-heading" className="our-story-heading">
              About the Creator
            </h2>
            <div className="our-story-creator__layout">
              <div className="our-story-prose our-story-creator__copy">
                <p>
                  Football Time Machine was created by Jake Loos, a lifelong
                  football supporter and sports technology executive.
                </p>
                <p>
                  Like many football supporters, I found myself wishing there
                  were another World Cup to watch once the tournament was over.
                </p>
                <p>That simple conversation led to a bigger question:</p>
              </div>
              <blockquote className="our-story-creator__question">
                <p>
                  “Why isn’t there a way to experience historic tournaments
                  without already knowing how they end?”
                </p>
              </blockquote>
              <div className="our-story-prose our-story-creator__copy">
                <p>
                  Football Time Machine began as an experiment to answer that
                  question.
                </p>
                <p>
                  What started as a personal passion project has grown into an
                  interactive football archive designed to let supporters
                  rediscover the game’s greatest moments exactly as they
                  unfolded.
                </p>
              </div>
              <dl className="our-story-creator__meta">
                <div>
                  <dt className="visually-hidden">Creator</dt>
                  <dd>Built by Jake Loos</dd>
                </div>
                <div>
                  <dt className="visually-hidden">Location</dt>
                  <dd>Chicago</dd>
                </div>
                <div>
                  <dt className="visually-hidden">Focus</dt>
                  <dd>Sports technology and football history</dd>
                </div>
              </dl>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-ahead"
            aria-labelledby="our-story-ahead-heading"
          >
            <h2 id="our-story-ahead-heading" className="our-story-heading">
              Looking Ahead
            </h2>
            <div className="our-story-prose our-story-ahead__copy">
              <p>This is only Version 1.</p>
              <p>Our ambition is simple:</p>
            </div>
            <p className="our-story-mission">
              To build the world’s greatest interactive archive of football
              history.
            </p>
            <ul className="our-story-mission-list">
              <li>Every tournament.</li>
              <li>Every match.</li>
              <li>Every story.</li>
            </ul>
            <p className="our-story-mission-close">
              Experienced one match at a time.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-principles"
            aria-labelledby="our-story-principles-heading"
          >
            <p className="our-story-eyebrow our-story-principles__eyebrow">
              Our Principles
            </p>
            <h2 id="our-story-principles-heading" className="visually-hidden">
              Our Principles
            </h2>
            <ul className="our-story-principles__list">
              {PRINCIPLES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section
            className="our-story-section our-story-join"
            aria-labelledby="our-story-join-heading"
            id="our-story-feedback"
          >
            <h2 id="our-story-join-heading" className="our-story-heading">
              Join the Journey
            </h2>
            <div className="our-story-prose our-story-join__copy">
              <p>Football Time Machine is only just getting started.</p>
              <p>
                Every new tournament, feature and improvement is shaped by the
                people using it.
              </p>
              <p>
                If you spot a historical error, a broken replay, a typo or simply
                have an idea that would make the experience better, we’d love to
                hear from you.
              </p>
              <p>Thanks for being part of the journey.</p>
            </div>
            <div className="our-story-join__actions">
              <SendFeedbackButton className="our-story-cta our-story-cta--primary" />
              <button
                type="button"
                className="our-story-cta our-story-cta--secondary"
                onClick={onBrowseArchive}
              >
                Browse the Archive
              </button>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <p className="our-story-closing">
            The next World Cup may be years away.
            <br />
            The last one is waiting for you.
          </p>
        </Reveal>
      </article>

      <SiteFooter variant="home" />
    </div>
  );
}
