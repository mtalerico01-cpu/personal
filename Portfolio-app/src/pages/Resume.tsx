import { ExternalLink, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

function handlePrint() {
  const win = window.open("/resume.html", "_blank");
  if (win) win.onload = () => win.print();
}

/**
 * Resume page — embeds the polished resume.html document in an iframe.
 * Open in full page or print to PDF via the control bar.
 */
export function Resume() {
  return (
    <main className="pt-16 flex flex-col" style={{ height: "100vh" }} aria-label="Resume">
      {/* Control bar */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            Michael Talerico
            <span className="text-muted-foreground font-normal ml-2 hidden sm:inline">
              &mdash; Senior Data Analyst &amp; Analytics Product Builder
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/resume.html" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} className="mr-1.5" aria-hidden="true" />
                Open
              </a>
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer size={14} className="mr-1.5" aria-hidden="true" />
              Print / PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Resume iframe */}
      <iframe
        src="/resume.html"
        title="Michael Talerico — Resume"
        className="w-full border-none flex-1"
        style={{ minHeight: "900px" }}
        aria-label="Resume document"
      />
    </main>
  );
}
