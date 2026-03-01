import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StockGenieParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 6 + Math.random() * 8,
        size: 2 + Math.random() * 4,
        opacity: 0.15 + Math.random() * 0.35,
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
            background: `radial-gradient(circle, hsl(210 80% 65% / ${p.opacity}), transparent)`,
          }}
          animate={{
            y: [0, -80, -160, 0],
            x: [0, 20, -10, 0],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
            scale: [0.8, 1.2, 1, 0.8],
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
        style={{ backdropFilter: "blur(12px)", background: "rgba(0,0,0,0.6)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-4 p-8 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9))",
            border: "1px solid rgba(100,150,255,0.15)",
            boxShadow: "0 0 80px rgba(59,130,246,0.15), 0 25px 50px rgba(0,0,0,0.5)",
          }}
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold mb-4"
            style={{ color: "hsl(210 40% 90%)" }}
          >
            Before You Continue…
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base leading-relaxed mb-2"
            style={{ color: "hsl(210 20% 65%)" }}
          >
            This page has something personal.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base leading-relaxed mb-8"
            style={{ color: "hsl(210 20% 65%)" }}
          >
            Are you sure you want to see it?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={onContinue}
              className="px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(210 80% 55%), hsl(230 70% 50%))",
                color: "white",
                boxShadow: "0 0 30px rgba(59,130,246,0.3)",
              }}
            >
              Yes, Continue
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "hsl(210 20% 60%)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Maybe Later
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const StockGenie = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50 && !popupDismissed && !showPopup) {
      setShowPopup(true);
    }
  }, [popupDismissed, showPopup]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClose = () => {
    setShowPopup(false);
    setPopupDismissed(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    setTransitioning(true);
    setTimeout(() => navigate("/akka"), 1200);
  };

  return (
    <>
      {/* Cinematic fade-to-black transition */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "radial-gradient(circle at 50% 50%, hsl(25 50% 15%), hsl(0 0% 0%))" }}
          />
        )}
      </AnimatePresence>

      {/* Extra scroll height to trigger popup */}
      <div className="relative" style={{ minHeight: "120vh" }}>
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, hsl(220 50% 12%), hsl(220 30% 6%) 60%, hsl(220 20% 3%))",
          }}
        >
          {/* Blue glow orbs */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
            style={{ background: "hsl(210 80% 50%)" }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]"
            style={{ background: "hsl(260 70% 50%)" }}
          />

          <StockGenieParticles />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em]"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  color: "hsl(210 80% 70%)",
                }}
              >
                AI-Powered Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(135deg, hsl(0 0% 100%), hsl(210 30% 80%), hsl(210 60% 70%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              StockGenie — Predicting Markets with Intelligence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "hsl(210 15% 55%)" }}
            >
              Hybrid Transformer + Deep Learning architecture designed for next-generation stock forecasting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, hsl(210 80% 55%), hsl(230 70% 50%))",
                  color: "white",
                  boxShadow: "0 0 40px rgba(59,130,246,0.25), 0 10px 30px rgba(0,0,0,0.3)",
                }}
              >
                View Architecture
              </button>
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  color: "hsl(210 30% 75%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                Explore Demo
              </button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg
                  className="mx-auto w-5 h-8"
                  fill="none"
                  viewBox="0 0 20 32"
                  stroke="hsl(210 30% 40%)"
                  strokeWidth="1.5"
                >
                  <rect x="5" y="1" width="10" height="18" rx="5" />
                  <line x1="10" y1="6" x2="10" y2="10" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      <ScrollPopup
        isOpen={showPopup}
        onClose={handleClose}
        onContinue={handleContinue}
      />
    </>
  );
};

export default StockGenie;
