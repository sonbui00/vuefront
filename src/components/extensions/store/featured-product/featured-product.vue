<template>
  <vf-o-apollo
    :variables="{ids}"
  >
    <template #loader>
      <vf-l-product-module :column="column" />
    </template>
    <template #default="{data}">
      <vf-o-product-module
        :items="data.featuredProducts.content"
        :column="column"
      >{{$t('modules.store.featuredProduct.textTitle')}}</vf-o-product-module>
    </template>
  </vf-o-apollo>
</template>
<script>
export default {
  props: {
    ids: {
      type: Array,
      default: []
    },
    column: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<graphql>
query($ids: [Int]){
    featuredProducts: productsList(page: 1, size: 4, ids: $ids, sort: "date_added", order: "DESC") {
        content {
            id
            name
            shortDescription
            price
            special
            image
            imageLazy
            rating
            keyword
        }
    }
}
</graphql>