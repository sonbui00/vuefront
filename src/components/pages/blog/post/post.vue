<template>
  <vf-t-blog-post v-if="loaded" :post="post" />
  <vf-l-post v-else />
</template>
<script>
import { mapGetters } from "vuex";
export default {
  head() {
    if (!this.post.meta) {
      return {};
    }
    return {
      title: this.post.meta.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.meta.description
        },
        {
          name: "keywords",
          content: this.post.meta.keyword
        }
      ]
    };
  },
  data() {
    return {
      loaded: true
    };
  },
  computed: {
    ...mapGetters({
      post: "blog/post/get"
    })
  },
  mounted() {
    if (!this.loaded) {
      this.handleLoadData();
    }
  },
  asyncData(ctx) {
    return {
      loaded: !process.client
    };
  },
  serverPrefetch() {
    return this.handleLoadData(this);
  },
  methods: {
    async handleLoadData(ctx) {
      let { id } = this.$vuefront.params;
      await this.$store.dispatch("apollo/query", {
        query: this.$options.query,
        variables: { id }
      });
      const { post } = this.$store.getters["apollo/get"];

      this.$store.commit("blog/post/setPost", post);
      this.loaded = true;
    }
  }
};
</script>
<graphql>
query($id: String) {
  post(id: $id) {
    id
    title
    description
    image
    imageLazy
    datePublished
    rating
    meta {
      title
      description
      keyword
    }
    categories {
      id
      name
      url(url: "/blog/category/_id")
    }
    prev {
      id
      name
      image
      imageLazy
      shortDescription
      keyword
    }
    next {
      id
      name
      image
      imageLazy
      shortDescription
      keyword
    }
    reviews {
      totalElements
      content {
        author
        author_email
        content
        created_at
        rating
      }
    }
  }
}
</graphql>
