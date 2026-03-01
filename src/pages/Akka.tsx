import { motion } from "framer-motion";
import { Heart, Shield } from "lucide-react";
import { useMemo } from "react";

/* ─── Particles ─── */
const GoldenParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 6,
        size: 3 + Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsl(36 80% 60% / ${p.opacity}), transparent)`,
          }}
          animate={{
            y: [0, -100, -180, 0],
            x: [0, 15, -15, 0],
            opacity: [0, p.opacity, p.opacity * 0.4, 0],
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

/* ─── Line by line reveal helper ─── */
const RevealLine = ({
  children,
  delay = 0,
  className = "",
  bold = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  bold?: boolean;
}) => (
  <motion.p
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay }}
    className={`leading-relaxed ${
      bold
        ? "font-serif-display text-xl md:text-2xl font-semibold text-foreground"
        : "text-lg md:text-xl text-muted-foreground"
    } ${className}`}
  >
    {children}
  </motion.p>
);

/* ─── Section wrapper ─── */
const Section = ({
  children,
  gradient = false,
  className = "",
}: {
  children: React.ReactNode;
  gradient?: boolean;
  className?: string;
}) => (
  <section className={`py-24 md:py-36 ${gradient ? "bg-gradient-sunset" : "bg-background"} ${className}`}>
    <div className="max-w-2xl mx-auto px-6 text-center">{children}</div>
  </section>
);

/* ─── Hero ─── */
const AkkaHero = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-warm-glow overflow-hidden">
    <GoldenParticles />
    <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="mb-8"
      >
        <span className="akka-badge text-sm uppercase tracking-[0.4em]">AKKA</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-serif-display text-5xl md:text-7xl font-semibold text-foreground leading-tight mb-6"
      >
        AKKA… I Have Changed.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-lg md:text-xl text-muted-foreground font-light italic"
      >
        This is not just words. This is who I am choosing to become.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-12"
      >
        <svg
          className="mx-auto w-6 h-10 text-muted-foreground animate-bounce"
          fill="none"
          viewBox="0 0 24 40"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="7" y="1" width="10" height="18" rx="5" />
          <line x1="12" y1="6" x2="12" y2="10" />
        </svg>
      </motion.div>
    </div>
  </section>
);

/* ─── Realization ─── */
const realizationLines = [
  { text: "I didn't always understand you.", delay: 0 },
  { text: "I didn't see how much you did for me.", delay: 0.15 },
  { text: "I didn't value your care the way I should have.", delay: 0.3 },
  { text: "", delay: 0 },
  { text: "Instead of giving comfort, I caused hurt.", delay: 0.45 },
  { text: "Instead of protecting you, I created pain.", delay: 0.6 },
  { text: "", delay: 0 },
  { text: "And the hardest truth is…", delay: 0.75 },
  { text: "you never deserved that.", delay: 0.9, bold: true },
];

const RealizationSection = () => (
  <Section gradient>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="font-serif-display text-3xl md:text-4xl font-semibold text-foreground mb-14"
    >
      My Realization
    </motion.h2>
    <div className="space-y-5">
      {realizationLines.map((line, i) =>
        line.text === "" ? (
          <div key={i} className="h-4" />
        ) : (
          <RevealLine key={i} delay={line.delay} bold={line.bold}>
            {line.text}
          </RevealLine>
        )
      )}
    </div>
  </Section>
);

/* ─── Growth ─── */
const growthLines = [
  "I have reflected.",
  "I have thought deeply about who I was…",
  "and who I want to be.",
  "",
  "I don't want to be just your sibling by name.",
  "",
  "I want to be the brother you feel proud of.",
  "The brother you feel safe with.",
  "The brother you can rely on.",
];

const GrowthSection = () => (
  <Section>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="font-serif-display text-3xl md:text-5xl font-bold text-foreground mb-14"
    >
      I Have Grown.
    </motion.h2>
    <div className="relative">
      {/* Soft glow behind text */}
      <div
        className="absolute inset-0 -z-10 opacity-20 blur-[80px] rounded-full"
        style={{ background: "radial-gradient(ellipse, hsl(var(--warm-glow)), transparent)" }}
      />
      <div className="space-y-5">
        {growthLines.map((line, i) =>
          line === "" ? (
            <div key={i} className="h-4" />
          ) : (
            <RevealLine key={i} delay={i * 0.1} bold={i >= growthLines.length - 3}>
              {line}
            </RevealLine>
          )
        )}
      </div>
    </div>
  </Section>
);

/* ─── Promise ─── */
const promiseBlock1 = [
  { text: "I promise I have changed.", bold: true },
  { text: "" },
  { text: "If any issue arises, I will solve it calmly." },
  { text: "I will listen before reacting." },
  { text: "I will understand before speaking." },
  { text: "I will never repeat the mistakes of my past." },
  { text: "" },
  { text: "I will not walk away." },
  { text: "I will not disappear when things get hard." },
  { text: "" },
  { text: "In every situation —" },
  { text: "whether it is joy or struggle," },
  { text: "success or failure," },
  { text: "light or darkness —" },
  { text: "" },
  { text: "I will stand beside you.", bold: true },
  { text: "" },
  { text: "Not sometimes." },
  { text: "Not when it's easy." },
  { text: "" },
  { text: "Always.", bold: true },
];

const promiseBlock2 = [
  { text: "As long as I live,", bold: true },
  { text: "I will never leave you.", bold: true },
  { text: "" },
  { text: "I will be with you — as your brother." },
  { text: "In every phase of life." },
  { text: "In every battle." },
  { text: "In every dream." },
];

const PromiseSection = () => (
  <Section gradient>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mb-6"
    >
      <Shield className="mx-auto w-10 h-10 text-primary opacity-60" strokeWidth={1.5} />
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="font-serif-display text-3xl md:text-5xl font-bold text-foreground mb-14"
    >
      My Promise As Your Brother
    </motion.h2>

    <div className="space-y-4">
      {promiseBlock1.map((line, i) =>
        line.text === "" ? (
          <div key={`a${i}`} className="h-6" />
        ) : (
          <RevealLine key={`a${i}`} delay={(i % 8) * 0.08} bold={line.bold}>
            {line.text}
          </RevealLine>
        )
      )}
    </div>

    {/* Pause divider */}
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 0.3, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="h-px bg-border max-w-xs mx-auto my-16"
    />

    <div className="space-y-4">
      {promiseBlock2.map((line, i) =>
        line.text === "" ? (
          <div key={`b${i}`} className="h-4" />
        ) : (
          <RevealLine key={`b${i}`} delay={(i % 6) * 0.1} bold={line.bold}>
            {line.text}
          </RevealLine>
        )
      )}
    </div>
  </Section>
);

/* ─── Forever ─── */
const ForeverSection = () => (
  <Section>
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="mb-10"
    >
      <Heart className="mx-auto w-12 h-12 heart-color" fill="currentColor" strokeWidth={0} />
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="font-serif-display text-2xl md:text-4xl font-medium text-foreground leading-snug mb-2"
    >
      You deserved the brother you needed.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.6 }}
      className="h-8"
    />

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="font-serif-display text-2xl md:text-4xl font-semibold text-gradient-warm leading-snug"
    >
      And from today… I will be him.
    </motion.p>
  </Section>
);

/* ─── Footer ─── */
const AkkaFooter = () => (
  <footer className="py-16 md:py-24 bg-background">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-serif-display text-xl md:text-2xl text-muted-foreground mb-10"
      >
        For <span className="text-foreground font-medium">Anu</span> &{" "}
        <span className="text-foreground font-medium">Kruthika</span> — With Love, Always.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="inline-block"
      >
        <motion.span
          animate={{
            boxShadow: [
              "0 0 20px hsl(36 80% 50% / 0.2)",
              "0 0 40px hsl(36 80% 50% / 0.4)",
              "0 0 20px hsl(36 80% 50% / 0.2)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block px-8 py-3 rounded-full text-sm font-bold uppercase tracking-[0.4em]"
          style={{
            background: "linear-gradient(135deg, hsl(36 80% 55%), hsl(24 70% 50%))",
            color: "hsl(30 25% 97%)",
          }}
        >
          AKKA
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-12 h-px bg-border max-w-xs mx-auto"
      />
    </div>
  </footer>
);

/* ─── Page ─── */
const Akka = () => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
    className="overflow-x-hidden"
  >
    <AkkaHero />
    <RealizationSection />
    <GrowthSection />
    <PromiseSection />
    <ForeverSection />
    <AkkaFooter />
  </motion.main>
);

export default Akka;
