import { Blog } from "@/types/blog";
import { format } from "date-fns";
import { Share2, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface BlogDetailProps {
  blog: Blog;
}

export function BlogDetail({ blog }: BlogDetailProps) {
  const formattedDate = format(new Date(blog.date), "MMM dd, yyyy");

  const renderContent = (content: string) => {
    const lines = content.split("\n\n");
    return lines.map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold text-foreground mt-8 mb-4">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("> ")) {
        return (
          <blockquote key={index} className="bg-primary/5 border-l-4 border-primary p-4 my-6 italic text-foreground">
            {paragraph.replace("> ", "")}
          </blockquote>
        );
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n").map((item) => item.replace("- ", ""));
        return (
          <ul key={index} className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span className="text-primary font-medium">{blog.category[0]}</span>
          <span>·</span>
          <span>{blog.readTime || "5 min read"}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {blog.title}
        </h1>

        <Button size="sm" className="mb-6 gap-2">
          <Share2 className="w-4 h-4" />
          Share Article
        </Button>

        <div className="grid grid-cols-3 border border-border rounded-lg p-4 mb-8">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Category</p>
            <p className="font-medium text-foreground">{blog.category.join(" & ")}</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Read Time</p>
            <p className="font-medium text-foreground">{blog.readTime || "5 Mins"}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
            <p className="font-medium text-foreground">{formattedDate}</p>
          </div>
        </div>

        <div className="blog-content">
          {renderContent(blog.content)}
        </div>

        <div className="border-t border-border mt-8 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {blog.author?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground text-sm">
                Written by {blog.author?.name || "Anonymous"}
              </p>
              <p className="text-xs text-muted-foreground">
                {blog.author?.role || "Contributor"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <ThumbsUp className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}