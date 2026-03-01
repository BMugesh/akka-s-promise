import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-16 md:py-20 bg-background">
    <div className="max-w-2xl mx-auto px-6 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="font-serif-display text-xl md:text-2xl text-muted-foreground mb-8"
      >
        For <span className="text-foreground font-medium">Anu</span> &{" "}
        <span className="text-foreground font-medium">Kruthika</span> — With Love, Always.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="akka-badge text-xs font-semibold uppercase">AKKA</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-10 h-px bg-border max-w-xs mx-auto"
      />
    </div>
  </footer>
);

export default Footer;
