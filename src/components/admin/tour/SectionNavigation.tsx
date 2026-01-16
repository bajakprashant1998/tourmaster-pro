interface SectionNavigationProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  progress: number;
}

export function SectionNavigation({
  sections,
  activeSection,
  onSectionClick,
  progress,
}: SectionNavigationProps) {
  return (
    <div className="admin-card mb-6 sticky top-20 z-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">Jump To:</span>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className={`section-pill ${
                  activeSection === section.id ? "section-pill-active" : ""
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Tour setup: <strong className="text-foreground">{progress}%</strong> complete
            </span>
            <div className="w-32 progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
