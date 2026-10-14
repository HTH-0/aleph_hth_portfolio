(() => {
  const rail = document.getElementById("section-rail");
  if (!rail) return;

  const links = Array.from(rail.querySelectorAll("[data-rail-target]"));
  const sections = links
    .map((link) => document.getElementById(link.dataset.railTarget))
    .filter(Boolean);

  const setActive = (id) => {
    for (const link of links) {
      link.classList.toggle("active", link.dataset.railTarget === id);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length === 0) return;
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      setActive(visible[0].target.id);
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  for (const section of sections) observer.observe(section);
})();
