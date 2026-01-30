import { useEffect, useState } from "react";

export function useActiveSection(sectionIds = []) {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

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
