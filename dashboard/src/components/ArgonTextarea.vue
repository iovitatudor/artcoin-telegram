<template>
  <div class="form-group">
    <textarea
        class="form-control"
        rows="5"
        :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "argon-textarea",
  props: {
    id: String,
    placeholder: String,
  },
};
</script>