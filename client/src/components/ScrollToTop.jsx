import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();

  // Scroll to top automatically when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Monitor scroll position, calculate progress and detect bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((scrollY / scrollHeight) * 100)));
        setScrollProgress(progress);
        
        // Check if user is near or at the bottom (within 200px or >= 90% scrolled)
        const nearBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200 || progress >= 90;
        setIsNearBottom(nearBottom);
      }

      // Show button after scrolling past 200px
      if (scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circle progress calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        title="Scroll to top"
        className={`group flex items-center gap-2 bg-primary hover:bg-[#c2410c] text-white py-2.5 px-3.5 sm:px-4 rounded-full shadow-[0_8px_25px_rgba(234,88,12,0.4)] hover:shadow-[0_12px_30px_rgba(234,88,12,0.55)] transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer border border-orange-400/30 ${
          isNearBottom ? "ring-4 ring-orange-300 animate-bounce" : ""
        }`}
      >
        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center w-7 h-7">
          <svg className="w-7 h-7 transform -rotate-90">
            <circle
              cx="14"
              cy="14"
              r={11}
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              className="text-orange-300/40"
            />
            <circle
              cx="14"
              cy="14"
              r={11}
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 11}
              strokeDashoffset={2 * Math.PI * 11 - (scrollProgress / 100) * (2 * Math.PI * 11)}
              strokeLinecap="round"
              className="text-white transition-all duration-150"
            />
          </svg>
          <ArrowUp
            size={16}
            strokeWidth={2.8}
            className="absolute transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </div>

        {/* Text Label */}
        <span className="font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap">
          {isNearBottom ? "Top ↑" : "Top"}
        </span>

        {/* Percentage badge when scrolled deep */}
        {scrollProgress > 0 && (
          <span className="text-[10px] font-semibold bg-white/20 px-1.5 py-0.5 rounded-full hidden sm:inline-block">
            {scrollProgress}%
          </span>
        )}
      </button>
    </div>
  );
}
