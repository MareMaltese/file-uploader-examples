<template>
    <div>
      <h1>VIDEO TRANSFORMER</h1>
      <input
      type="hidden"
      role="uploadcare-uploader"
      ref="uploader"
      :data-public-key=UPLOADCARE_PUBLIC_KEY
      data-multiple="false"
      data-effects="crop,enhance"
      data-clearable
      data-images-only="false"
    />
    <p v-if="fileUrl">
      Video cargado y convertido: <a :href="fileUrl" target="_blank">{{ fileUrl }}</a>
    </p>
  </div>
</template>


<script>
export default {
  name: "UploadcareVideoUploader",
  data() {
    return {
      fileUrl: null,
    };
  },
  mounted() {
    console.log('-------------------------------------');
    console.log('-------------------------------------');
  //   const widget = uploadcare.Widget(this.$refs.uploader);
  //   widget.onUploadComplete((fileInfo) => {
  //     // Append a video conversion transformation to the file URL
  //     this.fileUrl = `${fileInfo.cdnUrl}-/format/mp4/`;
  //     console.log("Video cargado y convertido:", this.fileUrl);
  //   });
  },
};
</script>
  
  <style scoped>
  </style>
  