import { motion } from "framer-motion";
import Particles from "./Particles";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-warm-glow overflow-hidden">
    <Particles />
    <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
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
        This is not just words. This is my promise.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-12"
      >
        <svg className="mx-auto w-6 h-10 text-muted-foreground animate-bounce" fill="none" viewBox="0 0 24 40" stroke="currentColor" strokeWidth="1.5">
          <rect x="7" y="1" width="10" height="18" rx="5" />
          <line x1="12" y1="6" x2="12" y2="10" />
        </svg>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
