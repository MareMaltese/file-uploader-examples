<template>
    <div>
      <h1>VIDEO TRANSFORMER</h1>
      <input type="file" @change="uploadFile" />
      <p v-if="fileUrl">
        Video cargado y convertido: <a :href="fileUrl" target="_blank">{{ fileUrl }}</a>
      </p>
    </div>
  </template>
  
  <script>

  export default {
    name: "UploadcareVideoConverter",
    data() {
      return {
        fileUrl: null,
      };
    },
    methods: {
      async uploadFile(event) {
        const file = event.target.files[0];
        if (!file) return;
  
        const uploadClient = new window.uploadcare.UploadClient({
          publicKey: "b47465288b4302732bb4", // TODO go to const
        });
  
        try {
          // Subir el archivo a Uploadcare
          const fileInfo = await uploadClient.uploadFile(file);
  
          // Crear la URL transformada a MP4
          this.fileUrl = `${fileInfo.cdnUrl}-/format/mp4/`;
  
          console.log("Video cargado y convertido:", this.fileUrl);
        } catch (error) {
          console.error("Error al cargar el archivo:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  