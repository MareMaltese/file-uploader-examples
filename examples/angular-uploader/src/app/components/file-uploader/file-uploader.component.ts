import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import * as LR from '@uploadcare/blocks';
import { OutputFileEntry } from '@uploadcare/blocks';
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';

import cssOverrides from './file-uploader.overrides.css?raw';

LR.registerBlocks(LR);

@Component({
  selector: 'file-uploader',
  standalone: true,
  imports: [],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FileUploaderComponent {
  @Input({ required: true }) theme!: 'light' | 'dark';
  @Input() uploaderClassName: string | undefined;
  @Input() files: OutputFileEntry<'success'>[] = [];
  @Output() filesChange = new EventEmitter<OutputFileEntry<'success'>[]>();

  uploadedFiles: OutputFileEntry<'success'>[] = [];
  @ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
    InstanceType<LR.UploadCtxProvider>
  >;

  @ViewChild('config', { static: true }) configRef!: ElementRef<
    InstanceType<LR.Config>
  >;

  blocksStyles = blocksStyles;

  ngOnInit() {
    /*
    Note: File Uploader styles are scoped due to ShadowDOM usage.
    There are two ways to override them. One way is used on the line below,
    another one is to set a custom class to File Uploader,
    and use CSS variables to update styles.

    See more: https://uploadcare.com/docs/file-uploader/styling/
   */
    LR.FileUploaderRegular.shadowStyles = cssOverrides;

    /*
      Note: Event binding is the main way to get data and other info from File Uploader.
      There plenty of events you may use.

      See more: https://uploadcare.com/docs/file-uploader/events/
     */
    this.ctxProviderRef.nativeElement.addEventListener(
      'change',
      this.handleChangeEvent
    );
    this.ctxProviderRef.nativeElement.addEventListener(
      'modal-close',
      this.handleModalCloseEvent
    );

    /*
      Note: Localization of File Uploader is done via DOM property on the config node.
      You can change any piece of text of File Uploader this way.

      See more: https://uploadcare.com/docs/file-uploader/localization/
     */
    this.configRef.nativeElement.localeDefinitionOverride = {
      en: {
        'photo__one': 'photo',
        'photo__many': 'photos',
        'photo__other': 'photos',

        'upload-file': 'Upload photo',
        'upload-files': 'Upload photos',
        'choose-file': 'Choose photo',
        'choose-files': 'Choose photos',
        'drop-files-here': 'Drop photos here',
        'select-file-source': 'Select photo source',
        'edit-image': 'Edit photo',
        'no-files': 'No photos selected',
        'caption-edit-file': 'Edit photo',
        'files-count-allowed': 'Only {{count}} {{plural:photo(count)}} allowed',
        'files-max-size-limit-error': 'Photo is too big. Max photo size is {{maxFileSize}}.',
        'header-uploading': 'Uploading {{count}} {{plural:photo(count)}}',
        'header-succeed': '{{count}} {{plural:photo(count)}} uploaded',
        'header-total': '{{count}} {{plural:photo(count)}} selected',
      }
    }
  }

  ngOnDestroy() {
    /*
      Note: We're resetting styles here just to be sure they do not affect other examples.
      You probably do not need to do it in your app.
     */
    LR.FileUploaderRegular.shadowStyles = '';

    this.ctxProviderRef.nativeElement.removeEventListener('change', this.handleChangeEvent);
    this.ctxProviderRef.nativeElement.removeEventListener('modal-close', this.handleModalCloseEvent);

    this.configRef.nativeElement.localeDefinitionOverride = null;
  }

  /*
    Note: Here we use provider's API to reset File Uploader state.
    It's not necessary though. We use it here to show users
    a fresh version of File Uploader every time they open it.

    Another way is to sync File Uploader state with an external store.
    You can manipulate File Uploader using API calls like `addFileFromObject`, etc.

    See more: https://uploadcare.com/docs/file-uploader/api/
   */
  resetUploaderState() {
    this.ctxProviderRef.nativeElement.uploadCollection.clearAll();
  }

  handleRemoveClick(uuid: OutputFileEntry['uuid']) {
    this.filesChange.emit(this.files.filter((f) => f.uuid !== uuid));
  }

  handleChangeEvent = (e: LR.EventMap['change']) => {
    this.uploadedFiles = e.detail.allEntries.filter(f => f.status === 'success') as OutputFileEntry<'success'>[];
  };

  handleModalCloseEvent = () => {
    this.resetUploaderState();

    this.filesChange.emit([...this.files, ...this.uploadedFiles]);
    this.uploadedFiles = [];
  };
}
