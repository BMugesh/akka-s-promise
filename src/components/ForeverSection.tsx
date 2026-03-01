import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const ForeverSection = () => (
  <section className="py-24 md:py-32 bg-gradient-sunset">
    <div className="max-w-2xl mx-auto px-6 text-center">
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
        className="font-serif-display text-2xl md:text-4xl font-medium text-foreground leading-snug mb-4"
      >
        You deserve the brother you needed.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-serif-display text-2xl md:text-4xl font-semibold text-gradient-warm leading-snug"
      >
        And from today… I will be him.
      </motion.p>
    </div>
  </section>
);

export default ForeverSection;
