import * as LR from "@uploadcare/blocks";
import { CustomFileUploader } from "./CustomFileUploader.js";
import { CustomSourceBtn } from "./CustomSourceBtn.js";
import { UnsplashSource } from "./UnsplashSource.js";
import './style.css';

LR.registerBlocks({
  ...LR,
  CustomFileUploader,
  UnsplashSource,
  SourceBtn: CustomSourceBtn,
});

if (!import.meta.env.VITE_UNSPLASH_TOKEN) {
  throw new Error("VITE_UNSPLASH_TOKEN is not defined");
}