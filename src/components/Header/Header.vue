<template>
  <header>
    <div class="wrapper">
      <div>
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path
              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
              fill="#FFF"
            />
            <path
              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
              fill="#555AB9"
            />
            <path
              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
              fill="#91BAF8"
            />
          </g>
        </svg>
        <h1>Matic</h1>
      </div>
      <div>
        <m-button size="small" @onClick="onLogout" label="Log out" v-if="user" />
        <m-button size="small" @onClick="onLogin" label="Log in" v-if="!user" />
        <m-button primary size="small" @onClick="onCreateAccount" label="Sign up" v-if="!user" />
      </div>
    </div>
  </header>
</template>

<script>
import './header.css';
import MButton from '../Button/Button';

export default {
  name: 'm-header',

  components: { MButton },

  props: {
    user: {
      type: Object,
    },
  },

  methods: {
    onLogin() {
      this.$emit('onLogin');
    },
    onLogout() {
      this.$emit('onLogout');
    },
    onCreateAccount() {
      this.$emit('onCreateAccount');
    },
  },
};
</script>