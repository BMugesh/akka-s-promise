import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

/* ════════════════════════════════
   GOLDEN PARTICLE FIELD
════════════════════════════════ */
const GoldenParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 110 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: 1 + Math.random() * 2.5,
        opacity: 0.1 + Math.random() * 0.55,
        color:
          Math.random() > 0.55
            ? "212,175,55"
            : Math.random() > 0.5
              ? "255,255,255"
              : "180,140,80",
        drift: (Math.random() - 0.5) * 30,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(${p.color},${p.opacity}), transparent)`,
          }}
          animate={{
            y: [0, -120, -220, 0],
            x: [0, p.drift, -p.drift * 0.5, 0],
            opacity: [0, p.opacity, p.opacity * 0.35, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ════════════════════════════════
   REVEAL LINE — appears when scrolled into view
════════════════════════════════ */
const RevealLine = ({
  children,
  delay = 0,
  bold = false,
  large = false,
  gold = false,
  italic = false,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  bold?: boolean;
  large?: boolean;
  gold?: boolean;
  italic?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className={className}
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: large
          ? "clamp(1.6rem, 3.5vw, 2.6rem)"
          : "clamp(1.1rem, 2.2vw, 1.6rem)",
        fontWeight: bold ? 700 : 400,
        fontStyle: italic ? "italic" : "normal",
        color: gold ? "#d4af37" : bold ? "#fff" : "rgba(255,255,255,0.78)",
        lineHeight: 1.9,
        marginBottom: "4px",
        textShadow: gold ? "0 0 40px rgba(212,175,55,0.5)" : undefined,
      }}
    >
      {children}
    </motion.p>
  );
};

/* ════════════════════════════════
   SECTION WRAPPER
════════════════════════════════ */
const Section = ({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section
    id={id}
    className={`relative z-10 flex flex-col items-center justify-center text-center min-h-screen py-28 px-6 ${className}`}
  >
    <div className="max-w-2xl mx-auto w-full">{children}</div>
  </section>
);

/* ════════════════════════════════
   SECTION HEADING
════════════════════════════════ */
const SectionHeading = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay }}
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
        fontWeight: 700,
        color: "#fff",
        marginBottom: "52px",
        lineHeight: 1.15,
      }}
    >
      {children}
    </motion.h2>
  );
};

/* ════════════════════════════════
   HERO
════════════════════════════════ */
const Hero = () => (
  <section
    className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6"
    style={{ paddingTop: "120px", paddingBottom: "80px" }}
  >
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.8rem, 6vw, 5.8rem)",
        fontWeight: 700,
        color: "#fff",
        letterSpacing: "-0.5px",
        lineHeight: 1.1,
        maxWidth: "900px",
      }}
    >
      AKKA… I Finally Understand
      <br />
      What You Mean To Me.
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3, delay: 1, ease: "easeOut" }}
      style={{
        marginTop: "36px",
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.1rem, 2.4vw, 1.65rem)",
        color: "rgba(255,255,255,0.5)",
        fontWeight: 300,
        fontStyle: "italic",
        lineHeight: 1.9,
        maxWidth: "580px",
      }}
    >
      "Not just in words.
      <br />
      But in who I choose to become."
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
      className="mt-16"
    >
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <svg
          className="mx-auto"
          width="20"
          height="32"
          viewBox="0 0 20 32"
          fill="none"
          stroke="rgba(212,175,55,0.35)"
          strokeWidth="1.5"
        >
          <rect x="5" y="1" width="10" height="20" rx="5" />
          <line x1="10" y1="6" x2="10" y2="11" />
        </svg>
      </motion.div>
    </motion.div>
  </section>
);

/* ════════════════════════════════
   SECTION 1 — THE REALIZATION
════════════════════════════════ */
const RealizationSection = () => (
  <Section>
    <div className="space-y-2">
      <RevealLine delay={0}>"I didn't understand you before."</RevealLine>
      <div className="h-6" />
      <RevealLine delay={0.15}>"I didn't value what you did for me."</RevealLine>
      <div className="h-6" />
      <RevealLine delay={0.3}>
        "Instead of giving love…
        <br />I gave hurt."
      </RevealLine>
      <div className="h-6" />
      <RevealLine delay={0.45} bold>
        "Instead of protecting you…
        <br />I caused pain."
      </RevealLine>
      <div className="h-10" />
      <RevealLine delay={0.8} bold large>
        "And you never deserved that."
      </RevealLine>
    </div>
  </Section>
);

/* ════════════════════════════════
   SECTION 2 — WHO I AM NOW
════════════════════════════════ */
const WhoSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="who">
      {/* Sunrise golden radial glow */}
      <motion.div
        ref={ref}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "70%",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.18) 0%, transparent 70%)",
          zIndex: -1,
        }}
      />

      <SectionHeading>"I Am Not The Same Person."</SectionHeading>

      <div className="space-y-2 text-left mx-auto" style={{ maxWidth: "620px" }}>
        <RevealLine italic>
          "I have reflected.
          <br />I have thought.
          <br />I have grown.
        </RevealLine>
        <div className="h-4" />
        <RevealLine italic>I looked at myself honestly.</RevealLine>
        <div className="h-4" />
        <RevealLine italic>
          And I didn't like the brother I was becoming."
        </RevealLine>
        <div className="h-8" />
        <RevealLine bold delay={0.4} gold large>
          "But I refuse to stay that way."
        </RevealLine>
      </div>
    </Section>
  );
};

/* ════════════════════════════════
   SECTION 3 — THE PROMISE
════════════════════════════════ */
const PromiseSection = () => (
  <Section>
    {/* Shield icon above heading */}
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="mb-6"
    >
      <svg
        width="48"
        height="54"
        viewBox="0 0 100 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
        style={{ filter: "drop-shadow(0 0 12px rgba(212,175,55,0.6))" }}
      >
        <path
          d="M50 4 L92 20 L92 56 C92 80 50 108 50 108 C50 108 8 80 8 56 L8 20 Z"
          fill="rgba(212,175,55,0.1)"
          stroke="rgba(212,175,55,0.8)"
          strokeWidth="2.5"
        />
        <path
          d="M35 54 L46 65 L68 44"
          stroke="rgba(212,175,55,0.9)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>

    <SectionHeading>"My Promise As Your Brother"</SectionHeading>

    <div className="space-y-1 text-left mx-auto" style={{ maxWidth: "640px" }}>
      <RevealLine bold large>"I promise I have changed."</RevealLine>
      <div className="h-5" />
      <RevealLine>
        "I will never repeat the mistakes of my past.
      </RevealLine>
      <div className="h-3" />
      <RevealLine>
        If any issue arises,
        <br />I will solve it calmly instead of overreacting.
      </RevealLine>
      <div className="h-3" />
      <RevealLine>
        I will understand before I speak.
        <br />I will listen before I judge.
      </RevealLine>
      <div className="h-3" />
      <RevealLine>
        I will not let anger control me.
        <br />I will not let ego hurt you again."
      </RevealLine>

      <div className="h-10" />

      <RevealLine delay={0.1} large>
        "In every situation —
        <br />Good days.
        <br />Bad days.
        <br />Your happiest wins.
        <br />Your toughest battles.
      </RevealLine>
      <div className="h-4" />
      <RevealLine delay={0.2} bold large>
        I will be there."
      </RevealLine>

      <div className="h-10" />

      <RevealLine delay={0.3}>
        "As long as I live,
        <br />I will never leave you.
      </RevealLine>
      <div className="h-3" />
      <RevealLine delay={0.4}>
        As long as I breathe,
        <br />I will stand beside you.
      </RevealLine>
      <div className="h-6" />
      <RevealLine delay={0.5} italic>
        Not just as a sibling by name.
      </RevealLine>
      <div className="h-3" />
      <RevealLine delay={0.6} bold>But as your brother.</RevealLine>
      <div className="h-3" />
      <RevealLine delay={0.7} bold gold large>
        The brother you needed."
      </RevealLine>
    </div>
  </Section>
);

/* ════════════════════════════════
   SECTION 4 — THE CLIMAX
════════════════════════════════ */
const ClimaxSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen py-28 px-6"
    >
      <div style={{ maxWidth: "700px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.4,
            marginBottom: "28px",
          }}
        >
          "You deserved better from me.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 0.9, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.4,
            marginBottom: "28px",
          }}
        >
          And from today…
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, delay: 1.8, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            fontWeight: 700,
            color: "#f0d080",
            lineHeight: 1.4,
            textShadow: "0 0 60px rgba(212,175,55,0.6)",
          }}
        >
          You will have it."
        </motion.p>

        {/* Glowing shield */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 2.8, type: "spring", bounce: 0.35 }}
          className="mt-16 mx-auto"
          style={{ width: "fit-content" }}
        >
          <svg
            width="80"
            height="90"
            viewBox="0 0 100 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 24px rgba(212,175,55,0.85))" }}
          >
            <path
              d="M50 4 L92 20 L92 56 C92 80 50 108 50 108 C50 108 8 80 8 56 L8 20 Z"
              fill="rgba(212,175,55,0.12)"
              stroke="rgba(212,175,55,0.9)"
              strokeWidth="2.5"
            />
            <path
              d="M50 18 L80 30 L80 56 C80 72 50 94 50 94 C50 94 20 72 20 56 L20 30 Z"
              fill="rgba(212,175,55,0.06)"
              stroke="rgba(212,175,55,0.45)"
              strokeWidth="1.5"
            />
            <path
              d="M33 54 L45 66 L70 42"
              stroke="rgba(212,175,55,1)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════════════════════
   FINAL SCENE
════════════════════════════════ */
const FinalScene = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen py-28 px-6 overflow-hidden"
    >
      {/* Warm background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(180,120,30,0.2) 0%, rgba(212,175,55,0.08) 50%, transparent 80%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 3, delay: 0.5 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
          color: "rgba(255,255,255,0.65)",
          fontStyle: "italic",
          lineHeight: 1.9,
        }}
      >
        "For Anu &amp; Kruthika —
        <br />
        With Love. Always."
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, delay: 2.2 }}
        className="mt-16"
      >
        {/* Heartbeat pulse on the text shadow */}
        <motion.div
          animate={{
            textShadow: [
              "0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)",
              "0 0 70px rgba(212,175,55,1.0), 0 0 130px rgba(212,175,55,0.7), 0 0 200px rgba(212,175,55,0.3)",
              "0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)",
              "0 0 55px rgba(212,175,55,0.9), 0 0 100px rgba(212,175,55,0.5)",
              "0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)",
            ],
            scale: [1, 1.055, 1, 1.028, 1],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            fontWeight: 900,
            color: "#d4af37",
            letterSpacing: "10px",
            display: "inline-block",
          }}
        >
          ✨ AKKA ✨
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "2.5rem", marginTop: "16px" }}
        >
          💛
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════
   PAGE
════════════════════════════════ */
const Akka = () => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.6, ease: "easeOut" }}
    style={{ background: "#000", minHeight: "100vh", overflow: "hidden" }}
  >
    <GoldenParticles />
    <Hero />
    <RealizationSection />
    <WhoSection />
    <PromiseSection />
    <ClimaxSection />
    <FinalScene />
  </motion.main>
);

export default Akka;
