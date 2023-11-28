import * as LR from '@uploadcare/blocks';

import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css';

LR.registerBlocks(LR);

export default function App() {
  return (
    <div className="App">
      <lr-config
        ctx-name="my-uploader"
        pubkey="2b7f257e8ea0817ba746"
        sourceList="local, url, camera, dropbox"
      ></lr-config>
      <lr-file-uploader-regular
        css-src={blocksStyles}
        ctx-name="my-uploader"
      ></lr-file-uploader-regular>
    </div>
  );
}
