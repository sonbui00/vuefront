<template>
  <vf-m-dropdown variant="link" size="sm" right>
    <template slot="button-content">
      <vf-a-icon :icon="['far', 'user-circle']" />
    </template>
    <vf-m-dropdown-item
      v-if="!$vuefront.isAuth"
      to="/account/login"
    >{{$t('elements.common.header.topNav.signInText')}}</vf-m-dropdown-item>
    <vf-m-dropdown-item
      v-if="!$vuefront.isAuth"
      to="/account/register"
    >{{$t('elements.common.header.topNav.registerText')}}</vf-m-dropdown-item>
    <vf-m-dropdown-item
      v-if="$vuefront.isAuth"
      to="/account"
    >{{$t('elements.common.header.topNav.myAccountText')}}</vf-m-dropdown-item>
    <vf-m-dropdown-item to="/account/wishlist">{{$t('elements.common.header.topNav.wishlistText')}}</vf-m-dropdown-item>
    <vf-m-dropdown-item
      v-if="$vuefront.isAuth"
      @click="$vuefront.logout"
    >{{$t('elements.common.header.topNav.signOutText')}}</vf-m-dropdown-item>
  </vf-m-dropdown>
</template>

