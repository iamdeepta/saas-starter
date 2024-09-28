import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Blogs from "@/data/Blogs.json";
import Tags from "@/data/Tags.json";
import { Loader2, PlusCircle } from "lucide-react";
import { Suspense, lazy } from "react";

const DataTable = lazy(() => import("@/components/common/DataTable"));

const BlogPostsPage = () => {
  const blogs = { ...Blogs };
  const tags = [...Tags];

  return (
    <Suspense
      fallback={
        <Loader2 className="flex items-center justify-center min-h-[100vh] animate-spin" />
      }
    >
      <section className="flex-1 p-4 lg:p-8">
        <div className="flex justify-between items-center flex-wrap">
          <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
            Blog Posts
          </h1>
          <Button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Blog
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Total Blogs: {blogs?.data?.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={blogs} tags={tags} />
          </CardContent>
        </Card>
      </section>
    </Suspense>
  );
};

export default BlogPostsPage;
