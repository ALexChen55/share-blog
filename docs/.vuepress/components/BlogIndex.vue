<template>
  <div>
    <div class="container mx-auto">
      <button
        class="bg-blue-500 sm:bg-green-500 md:bg-indigo-500 lg:bg-red-500 xl:bg-black ..."
      >Button</button>
    </div>

    <div class="article-item" v-for="post in posts" @click="handleJumpPage(post.path)">
      <img class="article-image" :src="post.frontmatter.image" alt="post.frontmatter.title" />
      <div class="article-description">
        <div>{{ post.frontmatter.title }}</div>
        <p>{{ post.frontmatter.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$site.pages
        .filter(
          x => x.path.startsWith(this.$route.path) && !x.frontmatter.blog_index
        )
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    }
  },
  methods: {
    handleJumpPage(path) {
      this.$router.push({ path });
    }
  }
};
</script>
<style lang="stylus" scoped>
.article-item {
  display: flex;
}

.article-image {
  width: 20%;
  object-fit: cover;
}

.article-description {
  flex: 80%;
  padding-left: 1em;
}
</style>
