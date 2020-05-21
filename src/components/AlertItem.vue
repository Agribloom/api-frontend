
<template>
  <div class="empty-alert">
    <div class="alert-img">
      <i v-if="fontIcon" :class="'alert-icon ' +fontIcon"></i>
      <i v-else class="la alert-icon la-exclamation-circle"></i>
    </div>
    <div class="alert-msg">
      <strong>{{title}}</strong>
      <i v-if="MessageIsString">{{messages}}</i>
      <i
        v-else
        :key="`alert-message-${index}`"
        v-for="(message, index) in messages"
        v-html="message"
      ></i>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "alertItem",
  props: {
    title: {
      default: "Oop!"
    },
    fontIcon: {
      required: false,
      default: "",
      type: String
    },
    messages: {
      default() {
        return [];
      }
    }
  },
  computed: {
    MessageIsString() {
      return typeof this.messages === "string";
    },
    iconClass() {
      return {
        la: true,
        "alert-icon": true
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../lib/style/_variable";
.empty-alert {
  align-items: center;
  background: transparent;
  color: $gray-500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px auto;
  max-width: 400px;
  padding: 60px;
  text-align: center;
  width: auto;

  .alert-img {
    .alert-icon {
      font-size: 60px !important;
      margin: 7px;
    }
  }

  .alert-msg {
    strong {
      display: block;
      font-size: 24px;
      font-weight: 600;
    }

    p {
      color: currentColor;
      font-size: 1em;
      font-weight: 300;
      line-height: 1.3;
      margin-top: 7px;
    }

    i {
      display: block;
    }

    .alert-response {
      margin-top: -4px;
    }
  }

  .btn {
    background: $gray-100;
    color: currentColor;
  }
}
</style>
