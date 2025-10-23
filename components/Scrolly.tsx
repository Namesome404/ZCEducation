import React from "react";

type Step = {
  key: string;
  title: string;
  body: string;
};

type Props = {
  steps: Step[];
  renderSticky: (active: Step, index: number) => React.ReactNode;
  threshold?: number;            // default 0.6
  rootMargin?: string;           // default "0px 0px -30% 0px"
};

export default function Scrolly({
  steps, renderSticky,
  threshold = 0.6,
  rootMargin = "0px 0px -30% 0px",
}: Props) {
  const [active, setActive] = React.useState(0);
  const stepRefs = React.useRef<HTMLDivElement[]>([]);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    if (prefersReduced) return; // 无动画降级：保留结构
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = stepRefs.current.findIndex((el) => el === e.target);
          if (idx !== -1) setActive(idx);
        }
      });
    }, { threshold, rootMargin });
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [threshold, rootMargin, prefersReduced]);

  return (
    <section className="scrolly">
      <figure className="graphic">
        <div className="sticky">
          {renderSticky(steps[active], active)}
        </div>
      </figure>
      <article className="steps">
        {steps.map((s, i) => (
          <div
            key={s.key}
            ref={(el) => { if (el) stepRefs.current[i] = el; }}
            className={`step ${i === active ? "is-active" : ""}`}
            aria-current={i === active ? "step" : undefined}
            tabIndex={0}
          >
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </article>
    </section>
  );
}

function useReducedMotion() {
  const [reduced, set] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    set(mq.matches);
    const handler = (e: MediaQueryListEvent) => set(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

