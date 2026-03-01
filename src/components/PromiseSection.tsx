import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const promises = [
  "I promise I have changed.",
  "I will never repeat the mistakes of my past.",
  "If any problem arises, I will solve it calmly instead of overreacting.",
  "I will understand before I speak.",
  "I will listen before I judge.",
  "I will stand by you in every situation — good or bad.",
  "In your happiest moments and your toughest battles.",
  "As long as I live, I will protect you.",
  "As long as I breathe, I will support you.",
];

const PromiseSection = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="max-w-2xl mx-auto px-6 text-center">
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

      <div className="space-y-5">
        {promises.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`text-lg md:text-xl leading-relaxed ${
              i === 0 || i >= promises.length - 2
                ? "font-serif-display text-xl md:text-2xl font-semibold text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  </section>
);

export default PromiseSection;
