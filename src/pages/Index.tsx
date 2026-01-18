import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogSidebarCard } from "@/components/blog/BlogSidebarCard";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { BlogSidebarSkeleton, BlogDetailSkeleton } from "@/components/blog/BlogSkeletons";
import { CreateBlogForm } from "@/components/blog/CreateBlogForm";
import { useBlogsQuery } from "@/hooks/useBlogs";
import { mockBlogs } from "@/lib/mockData";
import { Blog } from "@/types/blog";

const Index = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [useMockData, setUseMockData] = useState(true);
  const navigate = useNavigate();

  const { data: apiBlogs, isLoading, error } = useBlogsQuery();

  // Use mock data if API fails or is loading
  const blogs: Blog[] = useMockData || error ? mockBlogs : (apiBlogs ?? mockBlogs);
  const selectedBlog = blogs.find((b) => b.id === selectedBlogId) || blogs[0];

  const handleBlogClick = (blogId: number) => {
    setSelectedBlogId(blogId);
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-card py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            CA Monk Blog
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {error && !useMockData && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Could not connect to API server. Showing demo data.
                <Button
                  variant="link"
                  className="p-0 h-auto ml-2"
                  onClick={() => setUseMockData(true)}
                >
                  Use mock data
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end mb-6">
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Blog Post
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <h2 className="font-semibold text-foreground mb-4">Latest Articles</h2>
              {isLoading && !useMockData ? (
                <BlogSidebarSkeleton />
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <BlogSidebarCard
                      key={blog.id}
                      blog={blog}
                      isActive={selectedBlog?.id === blog.id}
                      onClick={() => handleBlogClick(blog.id)}
                    />
                  ))}
                </div>
              )}
            </aside>

            {/* Main Article */}
            <div className="lg:col-span-8 xl:col-span-9">
              {isLoading && !useMockData ? (
                <BlogDetailSkeleton />
              ) : selectedBlog ? (
                <BlogDetail blog={selectedBlog} />
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <CreateBlogForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
};

export default Index;