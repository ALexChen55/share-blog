<template>
  <div class="grid grid-cols-1">
    <div class="flex border border-gray-200 rounded p-2 m-2" v-for="post in posts" @click="handleJumpPage(post.path)">
      <img class="w-3/12" :src="post.frontmatter.image" alt="post.frontmatter.title" />
      <div class="w-9/12">
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
</style>
