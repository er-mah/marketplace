export const uriUtils = {
  generateSlug: function (text) {
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .slice(0, 60)
      .trim();
    return slug + "-" + Math.floor(Math.random() * 10000);
  },
};