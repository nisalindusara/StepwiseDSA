export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "-")
    .replace(/-+$/, "-");
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" });
}

export function formatBlogPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = Infinity,
  } = {},
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filter out drafts
    if (filterOutDrafts && draft) return acc;
    // filter out future posts
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;
    // add post
    acc.push(post);

    return acc;
  }, []);

  // sort by date
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date),
    );
  } else {
    // randomize the list
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  //limit the number of posts
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}

export function filterPostsByCategory(posts, category) {
  const filteredPosts = posts.reduce((acc, post) => {
    if (post.frontmatter.category != category) return acc;
    acc.push(post);
    return acc;
  }, []);

  return filteredPosts;
}
