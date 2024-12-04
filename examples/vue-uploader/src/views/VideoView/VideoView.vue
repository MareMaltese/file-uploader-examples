<script>
import * as UC from "@uploadcare/file-uploader";
import UploadcareVideoConverter from "../../components/UploadcareVideoConverter.vue";

UC.defineComponents(UC);

export default {
  components: {
    UploadcareVideoConverter,
  },
  data() {
    return {
      files: [],
      conversionResult: null,
    };
  },

  methods: {
    handleChangeEvent(e) {
      console.log("change event payload:", e);

      if (e.detail) {
        this.files = e.detail.allEntries.filter((f) => f.status === "success");
        if (this.files && this.files[0]?.uuid) {        
          console.log('>>>>>>> '+JSON.stringify(this.files[0]));
          this.convertVideo(this.files[0].uuid);
        }
      }
    },
    formatSize(bytes) {
      if (!bytes) return "0 Bytes";

      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
    },
    async convertVideo(uuid) {
      console.log('------------convert '+uuid);
      const apiUrl = "https://api.uploadcare.com/convert/video/";
      const publicKey = "b47465288b4302732bb4"; // Reemplaza con tu clave pública
      const secretKey = "f313897a98425e7e77b7"; // Reemplaza con tu clave secreta

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.uploadcare-v0.7+json",
            Authorization: `Uploadcare.Simple ${publicKey}:${secretKey}`,
          },
          body: JSON.stringify({
            paths: [`${uuid}/video/-/format/mp4/`],
            store: "1",
          }),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        this.conversionResult = data;
        console.log("Conversión exitosa:", data);
      } catch (error) {
        console.error("Error al convertir el video:", error);
      }
    },
  },
};

// async function formatVideo(file) {
//   try {
//     console.log("--------- ", JSON.stringify(file));
//     // Upload the file
//     const fileInfo = await uploadClient.uploadFile(file);

//     // Transform the file to MP4
//     this.fileUrl = `${file.cdnUrl}-/format/mp4/`;

//     console.log("Video cargado y convertido:", this.fileUrl);
//   } catch (error) {
//     console.error("Error al cargar o convertir el archivo:", error);
//   }
// }
</script>

<template>
  <div>
    <h2>hola</h2>

    <uc-config
      ctx-name="my-uploader-4"
      pubkey="a6ca334c3520777c0045"
      sourceList="local, url, camera, dropbox"
    ></uc-config>

    <uc-file-uploader-regular
      ctx-name="my-uploader-4"
      pubkey="a6ca334c3520777c0045"
    ></uc-file-uploader-regular>

    <uploadcare-video-converter />
    <!--
      Note: Event binding is the main way to get data and other info from File Uploader.
      There plenty of events you may use.

      See more: https://uploadcare.com/docs/file-uploader/events/
    -->
    <uc-upload-ctx-provider
      ctx-name="my-uploader-4"
      @change="handleChangeEvent"
    ></uc-upload-ctx-provider>

    <div class="previews">
      <div class="preview-wrapper" v-for="file in files" :key="file.cdnUrl">
        <video 
          v-if="file.mimeType.includes('video')"
          :src="`${file.cdnUrl}`"
          controls="controls"
        ></video>
        <img
          class="preview-image"
          :src="`${file.cdnUrl}/-/preview/-/resize/x400/`"
          width="200"
          height="200"
          :alt="file.fileInfo.originalFilename"
          :title="file.fileInfo.originalFilename"
        />
        {{file.cdnUrl}}
        <p class="preview-data">
          {{ file.fileInfo.originalFilename }}
        </p>
        <p class="preview-data">
          {{ formatSize(file.fileInfo.size) }}
        </p>

        <div>
          <button @click="convertVideo(file.uuid)">Convertir Video</button>
          <p v-if="conversionResult">Resultado: {{ conversionResult }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.previews {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  margin-top: 20px;
}

.preview-wrapper {
  background-color: white;
  color: darkslategray;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-image {
  display: block;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

.preview-data {
  font-size: 13px;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
