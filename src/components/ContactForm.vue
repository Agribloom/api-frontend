<template>
  <div>
    <div class="contact-title">
      <h4 class>Send Us a Message</h4>
    </div>
    <div class="comment-respond" id="respond">
      <div class>
        <form @submit="handleSubmit" >
          <div class>
            <div class="form-group">
              <input
                name="name"
                required="required"
                placeholder="Name"
                class="form-control"
                type="text"
                v-model="name.value"
              />
            </div>
            <div class="form-group">
              <input
                name="email"
                required="required"
                placeholder="Email"
                type="text"
                v-model="email.value"
              />
            </div>
            <div class="form-group">
              <input
                name="text"
                required="required"
                placeholder="Subject"
                type="text"
                v-model="subject.value"
              />
            </div>
            <div class="form-group">
              <textarea
                class="form-control"
                v-model="message.value"
                id="comment-reply"
                name="comment"
                placeholder="Type your message here"
                rows="5"
                required="required"
              ></textarea>
            </div>
          </div>
          <div>
            <button type="submit" class="cbtn primary">
              <span>Submit Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin";

export default {
  name: "ContactUs",
  mixins: [mixin],
  data() {
    return {
      name: {
        value: null,
        validator: /^\s{2,}$/
      },
      message: {
        value: null,
        validator: /^\s{2,}$/
      },
      email: {
        value: null,
        validator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      },
      subject: {
        value: null,
        validator: /^\s{2,}$/
      }
    };
  },
  methods: {
    isValid() {
      let email =
        this.email.value && this.email.validator.test(this.email.value);
      let name = this.name.value && this.name.validator.test(this.name.value);
      let subject =
        this.subject.value && this.subject.validator.test(this.subject.value);
      let message =
        this.message.value && this.message.validator.test(this.message.value);
      console.log({ email: email });
      return email && name && subject && message;
    },
    handleSubmit(e) {
      e.preventDefault();
      if (this.isValid()) {
        let message = `Thank you ${this.name.value}, for reaching out to us. We will reply as soon as possible`;
        this.toastrAdd("Success", message, "success");
        /* Reset form */
        e.target.reset();
        this.name.value = null;
        this.email.value = null;
        this.subject.value = null;
        this.message.value = null;
      } else {
        this.toastrAdd("Error", "Invalid form input", "error");
      }
    }
  }
};
</script>

<style scoped>
</style>
