import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";

/* ════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════ */

/** Returns fewer particles on small screens to avoid jank */
const useParticleCount = () =>
  typeof window !== "undefined" && window.innerWidth < 640 ? 55 : 110;

/* ════════════════════════════════════════════════
   GOLDEN PARTICLE FIELD
════════════════════════════════════════════════ */
const GoldenParticles = () => {
  const count = useParticleCount();
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: 1 + Math.random() * 2.2,
        opacity: 0.1 + Math.random() * 0.5,
        color:
          Math.random() > 0.55
            ? "212,175,55"
            : Math.random() > 0.5
              ? "255,255,255"
              : "180,140,80",
        drift: (Math.random() - 0.5) * 28,
      })),
    [count]
  );

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
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
            y: [0, -110, -200, 0],
            x: [0, p.drift, -p.drift * 0.5, 0],
            opacity: [0, p.opacity, p.opacity * 0.3, 0],
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

/* ════════════════════════════════════════════════
   PARALLAX WRAPPER
   Each section gets a subtle vertical translate tied
   to the page scroll — creates layered depth.
════════════════════════════════════════════════ */
const ParallaxSection = ({
  children,
  speed = 0.12,         // 0 = no parallax, 0.2 = strong
  className = "",
  id,
  style = {},
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Map scroll 0→1 into a subtle upward nudge
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 80}px`, `-${speed * 80}px`]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative z-10 flex flex-col items-center justify-center text-center ${className}`}
      style={{ minHeight: "100svh", paddingTop: "80px", paddingBottom: "80px", ...style }}
    >
      <motion.div
        style={{ y, width: "100%", maxWidth: "680px", margin: "0 auto", paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════════════
   REVEAL LINE
════════════════════════════════════════════════ */
const RevealLine = ({
  children,
  delay = 0,
  bold = false,
  large = false,
  gold = false,
  italic = false,
  center = false,
}: {
  children: React.ReactNode;
  delay?: number;
  bold?: boolean;
  large?: boolean;
  gold?: boolean;
  italic?: boolean;
  center?: boolean;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: large
          ? "clamp(1.4rem, 4.5vw, 2.5rem)"
          : "clamp(1rem, 3vw, 1.55rem)",
        fontWeight: bold ? 700 : 400,
        fontStyle: italic ? "italic" : "normal",
        color: gold ? "#d4af37" : bold ? "#fff" : "rgba(255,255,255,0.8)",
        lineHeight: 1.85,
        marginBottom: "4px",
        textAlign: center ? "center" : "left",
        textShadow: gold ? "0 0 36px rgba(212,175,55,0.5)" : undefined,
      }}
    >
      {children}
    </motion.p>
  );
};

/* ════════════════════════════════════════════════
   SECTION HEADING
════════════════════════════════════════════════ */
const SectionHeading = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay }}
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.75rem, 5vw, 3.6rem)",
        fontWeight: 700,
        color: "#fff",
        marginBottom: "40px",
        lineHeight: 1.18,
        textAlign: "center",
      }}
    >
      {children}
    </motion.h2>
  );
};

/* ════════════════════════════════════════════════
   SPACER
════════════════════════════════════════════════ */
const Sp = ({ size = 6 }: { size?: number }) => (
  <div style={{ height: `${size * 4}px` }} />
);

/* ════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════ */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Hero title moves up slightly faster than scroll — classic parallax
  const titleY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0px", "-30px"]);

  return (
    <section
      ref={ref}
      className="relative z-10 flex flex-col items-center justify-center text-center"
      style={{ minHeight: "100svh", padding: "80px 16px" }}
    >
      <motion.h1
        style={{
          y: titleY,
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 7vw, 5.5rem)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.3px",
          lineHeight: 1.12,
          maxWidth: "820px",
          padding: "0 8px",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        AKKA… I Finally Understand
        <br />
        What You Mean To Me.
      </motion.h1>

      <motion.p
        style={{
          y: subY,
          marginTop: "28px",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(0.95rem, 3vw, 1.6rem)",
          color: "rgba(255,255,255,0.5)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.9,
          maxWidth: "520px",
          padding: "0 8px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, delay: 1, ease: "easeOut" }}
      >
        "Not just in words.
        <br />
        But in who I choose to become."
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="mt-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
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
};

/* ════════════════════════════════════════════════
   SECTION 1 — THE REALIZATION
════════════════════════════════════════════════ */
const RealizationSection = () => (
  <ParallaxSection speed={0.1}>
    <RevealLine center delay={0}>
      "I didn't understand you before."
    </RevealLine>
    <Sp />
    <RevealLine center delay={0.15}>
      "I didn't value what you did for me."
    </RevealLine>
    <Sp />
    <RevealLine center delay={0.3}>
      "Instead of giving love…
      <br />I gave hurt."
    </RevealLine>
    <Sp />
    <RevealLine center delay={0.45} bold>
      "Instead of protecting you…
      <br />I caused pain."
    </RevealLine>
    <Sp size={10} />
    <RevealLine center delay={0.8} bold large>
      "And you never deserved that."
    </RevealLine>
  </ParallaxSection>
);

/* ════════════════════════════════════════════════
   SECTION 2 — WHO I AM NOW
════════════════════════════════════════════════ */
const WhoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <ParallaxSection speed={0.14} id="who" style={{ position: "relative", overflow: "hidden" }}>
      {/* Sunrise golden glow — parallax-aware background */}
      <motion.div
        ref={sectionRef}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.2) 0%, transparent 70%)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      <SectionHeading>"I Am Not The Same Person."</SectionHeading>

      <div style={{ textAlign: "left" }}>
        <RevealLine italic>
          "I have reflected.
          <br />I have thought.
          <br />I have grown.
        </RevealLine>
        <Sp size={4} />
        <RevealLine italic>I looked at myself honestly.</RevealLine>
        <Sp size={4} />
        <RevealLine italic>
          And I didn't like the brother I was becoming."
        </RevealLine>
        <Sp size={8} />
        <RevealLine bold delay={0.4} gold large center>
          "But I refuse to stay that way."
        </RevealLine>
      </div>
    </ParallaxSection>
  );
};

/* ════════════════════════════════════════════════
   SECTION 3 — THE PROMISE
════════════════════════════════════════════════ */
const PromiseSection = () => (
  <ParallaxSection speed={0.1}>
    {/* Shield */}
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      style={{ marginBottom: "24px" }}
    >
      <svg
        width="44"
        height="50"
        viewBox="0 0 100 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "0 auto",
          display: "block",
          filter: "drop-shadow(0 0 12px rgba(212,175,55,0.6))",
        }}
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

    <div style={{ textAlign: "left" }}>
      <RevealLine bold large>
        "I promise I have changed."
      </RevealLine>
      <Sp size={5} />
      <RevealLine>
        "I will never repeat the mistakes of my past.
      </RevealLine>
      <Sp size={3} />
      <RevealLine>
        If any issue arises,
        <br />I will solve it calmly instead of overreacting.
      </RevealLine>
      <Sp size={3} />
      <RevealLine>
        I will understand before I speak.
        <br />I will listen before I judge.
      </RevealLine>
      <Sp size={3} />
      <RevealLine>
        I will not let anger control me.
        <br />I will not let ego hurt you again."
      </RevealLine>

      <Sp size={10} />

      <RevealLine delay={0.1} large>
        "In every situation —
        <br />Good days.
        <br />Bad days.
        <br />Your happiest wins.
        <br />Your toughest battles.
      </RevealLine>
      <Sp size={4} />
      <RevealLine delay={0.2} bold large>
        I will be there."
      </RevealLine>

      <Sp size={10} />

      <RevealLine delay={0.3}>
        "As long as I live,
        <br />I will never leave you.
      </RevealLine>
      <Sp size={3} />
      <RevealLine delay={0.4}>
        As long as I breathe,
        <br />I will stand beside you.
      </RevealLine>
      <Sp size={6} />
      <RevealLine delay={0.5} italic>
        Not just as a sibling by name.
      </RevealLine>
      <Sp size={3} />
      <RevealLine delay={0.6} bold>
        But as your brother.
      </RevealLine>
      <Sp size={3} />
      <RevealLine delay={0.7} bold gold large center>
        The brother you needed."
      </RevealLine>
    </div>
  </ParallaxSection>
);

/* ════════════════════════════════════════════════
   SECTION 4 — THE CLIMAX
════════════════════════════════════════════════ */
const ClimaxSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);

  return (
    <section
      ref={ref}
      className="relative z-10 flex flex-col items-center justify-center text-center"
      style={{ minHeight: "100svh", padding: "80px 16px" }}
    >
      {/* Subtle background blur blob parallax */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div style={{ maxWidth: "680px", width: "100%", padding: "0 8px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.7rem, 5.5vw, 4rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.4,
            marginBottom: "24px",
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
            fontSize: "clamp(1.7rem, 5.5vw, 4rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.4,
            marginBottom: "24px",
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
            fontSize: "clamp(1.7rem, 5.5vw, 4rem)",
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
          style={{ marginTop: "56px" }}
        >
          <svg
            width="72"
            height="80"
            viewBox="0 0 100 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 0 24px rgba(212,175,55,0.85))",
            }}
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

/* ════════════════════════════════════════════════
   FINAL SCENE
════════════════════════════════════════════════ */
const FinalScene = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Warm glow blob rises as you scroll into the final section
  const glowY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section
      ref={ref}
      className="relative z-10 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ minHeight: "100svh", padding: "80px 16px" }}
    >
      {/* Warm parallax glow */}
      <motion.div
        style={{
          y: glowY,
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(180,120,30,0.22) 0%, rgba(212,175,55,0.08) 50%, transparent 80%)",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 4, ease: "easeOut" }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 3, delay: 0.5 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.1rem, 3.5vw, 1.85rem)",
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
        style={{ marginTop: "56px" }}
      >
        <motion.div
          animate={{
            textShadow: [
              "0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)",
              "0 0 70px rgba(212,175,55,1.0), 0 0 130px rgba(212,175,55,0.7)",
              "0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)",
              "0 0 55px rgba(212,175,55,0.9), 0 0 100px rgba(212,175,55,0.5)",
              "0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)",
            ],
            scale: [1, 1.055, 1, 1.028, 1],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 9vw, 7rem)",
            fontWeight: 900,
            color: "#d4af37",
            letterSpacing: "clamp(4px, 2vw, 10px)",
            display: "inline-block",
          }}
        >
          ✨ AKKA ✨
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", marginTop: "14px" }}
        >
          💛
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════ */
const Akka = () => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.6, ease: "easeOut" }}
    style={{ background: "#000", minHeight: "100vh", overflowX: "hidden" }}
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
