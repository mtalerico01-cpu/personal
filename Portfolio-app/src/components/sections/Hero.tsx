import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/ui/gradient-text";
import { siteConfig } from "@/data/meta";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 0.61, 0.36, 1] },
  },
};

/**
 * Full-viewport hero section for the homepage.
 * Establishes Michael's professional identity immediately on page load.
 */
export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Decorative background ───────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid opacity-60" />

        {/* Gradient orb — primary */}
        <div className="absolute top-1/4 -left-32 w-[640px] h-[640px] rounded-full bg-primary/8 blur-[120px]" />

        {/* Gradient orb — accent */}
        <div className="absolute bottom-1/4 right-0 w-[480px] h-[480px] rounded-full bg-accent/8 blur-[100px]" />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* ── Status badge ──────────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-8 py-1.5 px-4 text-xs border-primary/25 bg-primary/8 text-primary"
            >
              <span
                className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                aria-hidden="true"
              />
              {siteConfig.currentRole} at {siteConfig.currentOrg}
              {siteConfig.openToWork && (
                <span className="ml-2 pl-2 border-l border-primary/30 text-muted-foreground">
                  Open to opportunities
                </span>
              )}
            </Badge>
          </motion.div>

          {/* ── Headline ──────────────────────────────────────────── */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-7 text-balance"
          >
            Turning Data Into{" "}
            <GradientText variant="mixed">
              Intelligent Decisions
            </GradientText>
          </motion.h1>

          {/* ── Subheadline ───────────────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl"
          >
            Senior analytics professional building modern analytics products
            that help business, product, and executive teams act with confidence.
            Specializing in product analytics, AI measurement, and analytics
            application development.
          </motion.p>

          {/* ── CTAs ──────────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link to="/case-studies">
                Explore My Work
                <ArrowRight
                  size={18}
                  className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a href={siteConfig.resumeUrl} download>
                <Download size={18} className="mr-1" aria-hidden="true" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* ── Tagline ───────────────────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            className="mt-12 text-sm text-muted-foreground/60 tracking-wide"
          >
            {siteConfig.location} · The Home Depot Pro Product
          </motion.p>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-muted-foreground/30 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
