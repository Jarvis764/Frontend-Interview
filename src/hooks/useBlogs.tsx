import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";
import { CreateBlogInput } from "@/types/blog";

export const useBlogsQuery = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogApi.getAll,
  });
};

export const useBlogQuery = (id: number) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => blogApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: CreateBlogInput) => blogApi.create(blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};