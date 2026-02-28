// ============================================================
// BlogDetailPage — Dynamic blog article by :slug param
// ============================================================

import { useParams, Navigate } from "react-router-dom";
import {
  BlogDetailHeader,
  BlogDetailHeroImage,
  BlogDetailBody,
  BlogDetailAuthorBio,
  BlogDetailNewsletter,
  BlogDetailComments,
  BlogDetailRelated,
  BlogDetailNotFound,
} from "@/components/blog/detail";
import { getBlogPostBySlug } from "@/data/blog.data";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/blog" replace />;

  const post = getBlogPostBySlug(slug);

  console.log("post : ", post);

  if (!post) return <BlogDetailNotFound />;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <article className="max-w-3xl mx-auto">
        <BlogDetailHeader post={post} />
        <BlogDetailHeroImage post={post} />
        <BlogDetailBody content={post.content} />
        <BlogDetailAuthorBio author={post.author} />
        <BlogDetailNewsletter />
        <BlogDetailComments comments={post.comments} />
      </article>

      <BlogDetailRelated posts={post.related} />
    </main>
  );
}
