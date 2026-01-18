import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { BlogDetailSkeleton } from "@/components/blog/BlogSkeletons";
import { useBlogQuery } from "@/hooks/useBlogs";
import { mockBlogs } from "@/lib/mockData";

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const blogId = Number(id);

  const { data: blog, isLoading, error } = useBlogQuery(blogId);

  // Fallback to mock data if API fails
  const displayBlog = blog ?? mockBlogs.find((b) => b.id === blogId);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Button>

          {error && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Could not load blog from API. Showing cached version.
              </AlertDescription>
            </Alert>
          )}

          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <BlogDetailSkeleton />
            ) : displayBlog ? (
              <BlogDetail blog={displayBlog} />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Blog not found
                </h2>
                <p className="text-muted-foreground mb-4">
                  The blog you're looking for doesn't exist.
                </p>
                <Button onClick={() => navigate("/")}>Go back home</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;