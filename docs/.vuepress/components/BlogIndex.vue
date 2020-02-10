<template>
  <div class="grid grid-cols-1">
    <div
      class="flex border border-gray-200 rounded p-2 m-2 cursor-pointer"
      v-for="post in posts"
      @click="handleJumpPage(post.path)"
    >
      <div class="w-3/12 h-32 relative">
        <img class="w-32 h-32 absolute bottom-0 left-0 right-0 top-0 m-auto" :src="post.frontmatter.image" alt="post.frontmatter.title" />
      </div>
      <div class="w-9/12">
        <div class="text-xl leading-relaxed">{{ post.frontmatter.title }}</div>
        <div class="text-blue-800 text-sm">{{post.frontmatter.date | dateString}}</div>
        <p class="text-base text-gray-500">{{ post.frontmatter.description }}</p>
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
  filters: {
    dateString(val) {
      return val.split("T")[0];
    }
  },
  methods: {
    handleJumpPage(path) {
      this.$router.push({ path });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
