import { useEffect, useState } from "react";

export function useActiveSection(sectionIds = []) {
  // Start with nothing active — the first nav item is no longer "Home",
  // so highlighting it while the visitor is still in the hero would be wrong.
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!sectionIds.length) return undefined;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
