import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/meta";

/**
 * Primary navigation.
 * - Transparent at page top → frosted glass on scroll.
 * - Desktop: horizontal link bar + CTA button.
 * - Mobile: hamburger → full-width dropdown drawer.
 * - Active link highlighted by current pathname.
 */
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Track scroll position to toggle glass style
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass border-b border-border/60 shadow-lg"
            : "bg-transparent border-b border-transparent"
        )}
        aria-label="Primary navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ─────────────────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="Home — Michael Talerico"
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "bg-primary text-primary-foreground text-sm font-bold",
                  "ring-2 ring-transparent group-hover:ring-primary/30 transition-all duration-200"
                )}
                aria-hidden="true"
              >
                MT
              </span>
              <span className="hidden sm:block font-semibold text-foreground text-sm tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            {/* ── Desktop Nav Links ─────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Site sections">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href ||
                  (link.href !== "/" && location.pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      isActive
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ───────────────────────────────────────── */}
            <div className="hidden md:flex items-center">
              <Button asChild size="sm">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>

            {/* ── Mobile Toggle ─────────────────────────────────────── */}
            <button
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-secondary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "fixed top-16 inset-x-0 z-50 md:hidden",
                "glass border-b border-border/60"
              )}
            >
              <nav
                className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href ||
                    (link.href !== "/" && location.pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150",
                        isActive
                          ? "text-foreground bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <div className="pt-3 mt-1 border-t border-border">
                  <Button asChild className="w-full" size="sm">
                    <Link to="/contact">Get In Touch</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
