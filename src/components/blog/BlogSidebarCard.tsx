import { Blog } from "@/types/blog";
import { formatDistanceToNow } from "date-fns";
import { TrendingUp, Briefcase, Settings, Star, Scale } from "lucide-react";

interface BlogSidebarCardProps {
  blog: Blog;
  isActive?: boolean;
  onClick?: () => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  FINANCE: TrendingUp,
  CAREER: Briefcase,
  TECH: Settings,
  SKILLS: Star,
  REGULATIONS: Scale,
};

const categoryStyles: Record<string, string> = {
  FINANCE: "category-finance",
  CAREER: "category-career",
  TECH: "category-tech",
  SKILLS: "category-skills",
  REGULATIONS: "category-regulations",
};

export function BlogSidebarCard({ blog, isActive, onClick }: BlogSidebarCardProps) {
  const primaryCategory = blog.category[0];
  const Icon = categoryIcons[primaryCategory] || TrendingUp;
  const categoryStyle = categoryStyles[primaryCategory] || "category-finance";

  const timeAgo = formatDistanceToNow(new Date(blog.date), { addSuffix: true });

  return (
    <div
      onClick={onClick}
      className={`article-card ${isActive ? "ring-2 ring-primary shadow-md" : ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`category-badge ${categoryStyle}`}>
          <Icon className="w-3 h-3" />
          {primaryCategory}
        </div>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </div>
      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{blog.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{blog.description}</p>
      <div className="flex gap-2 flex-wrap">
        {blog.category.slice(0, 2).map((cat) => (
          <span key={cat} className="text-xs px-2 py-0.5 rounded border border-border text-muted-foreground">
            {cat === "FINANCE" ? "Featured" : cat === "CAREER" ? "Study Tips" : cat === "TECH" ? "Development" : "Taxation"}
          </span>
        ))}
      </div>
    </div>
  );
}