import { motion } from "framer-motion";

const lines = [
  "I didn't understand you before.",
  "I didn't value what you did for me.",
  "Instead of giving love, I gave hurt.",
  "Instead of protecting you, I caused pain.",
  "And I regret that.",
];

const RealizationSection = () => (
  <section className="py-24 md:py-32 bg-gradient-sunset">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="font-serif-display text-3xl md:text-4xl font-semibold text-foreground mb-12"
      >
        My Realization
      </motion.h2>

      <div className="space-y-4">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`text-lg md:text-xl leading-relaxed ${
              i === lines.length - 1
                ? "font-serif-display text-xl md:text-2xl font-medium text-foreground mt-8"
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

export default RealizationSection;
