"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { uploadImage } from "@/lib/blob";

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveBlogPost(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";
  const slugInput = String(formData.get("slug") ?? "").trim();
  const cover = formData.get("coverImage") as File | null;
  const categoryIdRaw = String(formData.get("categoryId") ?? "").trim();
  const newCategoryName = String(formData.get("newCategoryName") ?? "").trim();

  if (!title || !excerpt || !content) {
    throw new Error("Faltan campos obligatorios.");
  }

  // Una categoría nueva escrita a mano tiene prioridad sobre la seleccionada.
  let categoryId: string | null = null;
  if (newCategoryName) {
    const category = await prisma.blogCategory.upsert({
      where: { name: newCategoryName },
      update: {},
      create: { name: newCategoryName },
    });
    categoryId = category.id;
  } else if (categoryIdRaw) {
    categoryId = categoryIdRaw;
  }

  const slug = slugify(slugInput || title);
  const coverImageUrl = await uploadImage(cover, "blog");

  const data = {
    title,
    slug,
    excerpt,
    content,
    published,
    categoryId,
    ...(coverImageUrl ? { coverImageUrl } : {}),
  };

  if (id) {
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
