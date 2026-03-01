import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ════════════════════════════════
   FLOATING CHART CANVAS
════════════════════════════════ */
const ChartCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    interface ChartLine {
      points: { x: number; y: number }[];
      offset: number;
      speed: number;
      color: string;
      alpha: number;
      width: number;
    }

    let W = 0, H = 0;
    const lines: ChartLine[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const generateLine = (): ChartLine => {
      const y = Math.random() * H * 0.7 + H * 0.15;
      const pts: { x: number; y: number }[] = [];
      const numPts = 80 + Math.floor(Math.random() * 60);
      let cx = -60, cy = y;
      for (let i = 0; i < numPts; i++) {
        cx += (W + 120) / numPts;
        cy += (Math.random() - 0.48) * 26;
        cy = Math.max(60, Math.min(H - 60, cy));
        pts.push({ x: cx, y: cy });
      }
      return {
        points: pts,
        offset: Math.random() * (W + 200),
        speed: 0.2 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? "#00c896" : "#1a6fff",
        alpha: 0.25 + Math.random() * 0.45,
        width: 1 + Math.random() * 1.2,
      };
    };

    for (let i = 0; i < 6; i++) lines.push(generateLine());

    const drawLine = (line: ChartLine) => {
      if (line.points.length < 2) return;
      const shift = (line.offset % (W + 200)) - 200;
      ctx.save();
      ctx.globalAlpha = line.alpha;
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.shadowBlur = 10;
      ctx.shadowColor = line.color;
      ctx.translate(shift, 0);
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length - 1; i++) {
        const mid = {
          x: (line.points[i].x + line.points[i + 1].x) / 2,
          y: (line.points[i].y + line.points[i + 1].y) / 2,
        };
        ctx.quadraticCurveTo(line.points[i].x, line.points[i].y, mid.x, mid.y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      lines.forEach((l) => {
        l.offset += l.speed;
        if (l.offset > W + 200) {
          const fresh = generateLine();
          Object.assign(l, fresh);
          l.offset = 0;
        }
        drawLine(l);
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.18, zIndex: 1 }}
    />
  );
};

/* ════════════════════════════════
   SCROLL POPUP
════════════════════════════════ */
const ScrollPopup = ({
  isOpen,
  onClose,
  onContinue,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.58)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.3 }}
          className="max-w-lg mx-4 px-14 py-14 rounded-2xl text-center"
          style={{
            background: "rgba(8,14,24,0.97)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "12px",
              fontWeight: 300,
            }}
          >
            There is something more important than this project.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2rem)",
              color: "#fff",
              fontWeight: 600,
              marginBottom: "48px",
              lineHeight: 1.3,
            }}
          >
            "Do you want to continue?"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button
              onClick={onContinue}
              className="px-11 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f0d080)",
                color: "#0a0a0a",
                boxShadow: "0 0 30px rgba(212,175,55,0.4)",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              YES
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.35)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Not Now
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ════════════════════════════════
   MAIN PAGE
════════════════════════════════ */
const StockGenie = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    const scrollPct =
      (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (scrollPct >= 0.6 && !popupDismissed && !showPopup) {
      setShowPopup(true);
    }
  }, [popupDismissed, showPopup]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClose = () => {
    setShowPopup(false);
    setPopupDismissed(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    setTransitioning(true);
    setTimeout(() => navigate("/akka"), 1400);
  };

  return (
    <>
      {/* Fade-to-black curtain */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[100] bg-black"
          />
        )}
      </AnimatePresence>

      {/* PAGE CONTENT — needs min-height so 60% scroll triggers */}
      <div
        style={{
          background: "#050a12",
          minHeight: "160vh",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        {/* Animated CSS Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,200,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,150,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            zIndex: 0,
          }}
        />

        {/* Floating chart lines */}
        <ChartCanvas />

        {/* NAV */}
        <nav
          className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-14 py-4"
          style={{
            background: "rgba(5,10,18,0.82)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(0,200,150,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "1.3rem",
              color: "#00c896",
              letterSpacing: "-0.5px",
            }}
          >
            Stock<span style={{ color: "#fff" }}>Genie</span>
          </div>
          <ul className="hidden md:flex gap-8 list-none">
            {["Features", "Markets", "Pricing", "About"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    transition: "color 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#00c896")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="px-6 py-2.5 rounded-lg text-sm font-bold transition-opacity hover:opacity-80"
            style={{
              background: "#00c896",
              color: "#050a12",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Start Free Trial
          </button>
        </nav>

        {/* HERO */}
        <section
          className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{ minHeight: "92vh", padding: "60px 32px 80px" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,200,150,0.1)",
              border: "1px solid rgba(0,200,150,0.28)",
              display: "inline-flex",
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 6, height: 6, background: "#00c896", borderRadius: "50%" }}
            />
            <span
              style={{
                color: "#00c896",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Now in Beta · 12,000+ Traders
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
              color: "#fff",
              letterSpacing: "-2px",
              lineHeight: 1.05,
              maxWidth: "900px",
              marginBottom: "28px",
            }}
          >
            StockGenie —{" "}
            <span style={{ color: "#00c896" }}>AI&nbsp;Powered</span>
            <br />
            Market Intelligence
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              color: "rgba(255,255,255,0.5)",
              fontStyle: "italic",
              maxWidth: "540px",
              lineHeight: 1.7,
              marginBottom: "52px",
            }}
          >
            "Predict smarter. Trade sharper. Win consistently."
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <button
              className="px-10 py-4 rounded-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #00c896, #00a07a)",
                color: "#050a12",
                fontSize: "1rem",
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 0 40px rgba(0,200,150,0.3)",
              }}
            >
              Get Started Free
            </button>
            <button
              className="px-10 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.14)",
                fontSize: "1rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              View Live Demo →
            </button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <svg
                className="mx-auto"
                width="20"
                height="32"
                viewBox="0 0 20 32"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
              >
                <rect x="5" y="1" width="10" height="20" rx="5" />
                <line x1="10" y1="6" x2="10" y2="11" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* STATS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-wrap justify-center gap-12 md:gap-20 px-8 py-14"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { val: "94.7%", lbl: "Signal Accuracy" },
            { val: "$2.1B+", lbl: "Trades Analyzed" },
            { val: "40ms", lbl: "Latency" },
            { val: "180+", lbl: "Markets" },
          ].map((s) => (
            <div key={s.lbl} className="text-center">
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "2.4rem",
                  color: "#00c896",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.38)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginTop: "4px",
                }}
              >
                {s.lbl}
              </div>
            </div>
          ))}
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto px-8 pb-24"
        >
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Institutional-Grade Intelligence.
            <br />
            Retail-Friendly Interface.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              maxWidth: "560px",
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif",
              marginBottom: "48px",
            }}
          >
            From pattern recognition to real-time news sentiment, StockGenie
            processes millions of data points so you don't have to. Focus on
            strategy, not noise.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: "🧠",
                title: "Predictive AI Engine",
                text: "Our proprietary transformer model analyzes 30+ technical indicators simultaneously to surface high-confidence trade signals.",
              },
              {
                icon: "⚡",
                title: "Sub-40ms Execution",
                text: "Co-located infrastructure near major exchanges ensures you never miss a micro-second of opportunity.",
              },
              {
                icon: "🛡️",
                title: "Risk-First Portfolio",
                text: "Dynamic stop-loss algorithms and position sizing guided by real-time volatility modeling.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -4, borderColor: "rgba(0,200,150,0.4)" }}
                className="rounded-xl p-8 transition-colors duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,200,150,0.09)",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>
                  {card.icon}
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "8px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.46)",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* POPUP */}
      <ScrollPopup
        isOpen={showPopup}
        onClose={handleClose}
        onContinue={handleContinue}
      />
    </>
  );
};

export default StockGenie;
