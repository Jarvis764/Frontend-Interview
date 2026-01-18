import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateBlogMutation } from "@/hooks/useBlogs";
import { useToast } from "@/hooks/use-toast";
import { CreateBlogInput } from "@/types/blog";

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  coverImage: z.string().url("Must be a valid URL"),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface CreateBlogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CATEGORY_OPTIONS = ["FINANCE", "TECH", "CAREER", "SKILLS", "REGULATIONS"];

export function CreateBlogForm({ open, onOpenChange, onSuccess }: CreateBlogFormProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();
  const createBlogMutation = useCreateBlogMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const onSubmit = async (data: BlogFormData) => {
    if (categories.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one category",
        variant: "destructive",
      });
      return;
    }

    try {
      const blogData: CreateBlogInput = {
        title: data.title,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage,
        category: categories,
        date: new Date().toISOString(),
        readTime: "5 min read",
        author: {
          name: "Guest Author",
          role: "Contributor",
        },
      };
      await createBlogMutation.mutateAsync(blogData);
      toast({
        title: "Success!",
        description: "Your blog has been created successfully.",
      });
      reset();
      setCategories([]);
      onOpenChange(false);
      onSuccess?.();
    } catch {
      toast({
        title: "Error",
        description: "Failed to create blog. Make sure the API server is running.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter blog title..."
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => (
                <Badge
                  key={cat}
                  variant={categories.includes(cat) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                  {categories.includes(cat) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A short summary of your blog..."
              rows={2}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              placeholder="https://example.com/image.jpg"
              {...register("coverImage")}
            />
            {errors.coverImage && (
              <p className="text-sm text-destructive">{errors.coverImage.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here... Use ## for headings, > for quotes"
              rows={8}
              {...register("content")}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createBlogMutation.isPending}>
              {createBlogMutation.isPending ? "Creating..." : "Create Blog"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}