type HeroProps = {
  onBegin: () => void;
};

export function Hero({ onBegin }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__image" />
        <div className="hero__vignette" />
        <div className="hero__grain" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">A spoiler-free archive of football history</p>
        <h1 id="hero-title" className="hero__title">
          Football Time Machine
        </h1>
        <div className="hero__tagline">
          <p>You know who won.</p>
          <p>Now discover why it mattered.</p>
        </div>
        <button type="button" className="hero__cta" onClick={onBegin}>
          Begin Your Journey
        </button>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
