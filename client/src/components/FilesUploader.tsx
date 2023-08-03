import { useState, useCallback, useRef, useEffect } from "react";
import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks";

LR.registerBlocks(LR);

interface FilesUploaderProps {
  setFileUrl: (fileUrl: string) => void;
}

const FilesUploader = ({ setFileUrl }: FilesUploaderProps) => {
  const dataOutputRef = useRef<LR.DataOutput>();

  const handleUploaderEvent = useCallback((e: CustomEvent<any>) => {
    const { data } = e.detail;
    setFileUrl(data[0].cdnUrl);
  }, []);

  useEffect(() => {
    const el = dataOutputRef.current;

    el?.addEventListener(
      "lr-data-output",
      handleUploaderEvent as EventListenerOrEventListenerObject
    );
    return () => {
      el?.removeEventListener(
        "lr-data-output",
        handleUploaderEvent as EventListenerOrEventListenerObject
      );
    };
  }, [handleUploaderEvent]);

  return (
    <>
      <lr-config
        ctx-name="my-uploader"
        pubkey={import.meta.env.VITE_PUBLIC_KEY_UPLOADCARE as string}
        multiple={false}
        confirm-upload={true}
        source-list="local, url, camera, facebook, gdrive, instagram"
      ></lr-config>

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        class="my-locale-override"
        css-src={`https://unpkg.com/@uploadcare/blocks@${PACKAGE_VERSION}/web/lr-file-uploader-regular.min.css`}
      >
        <lr-data-output
          ctx-name="my-uploader"
          ref={dataOutputRef}
          use-event
          hidden
          onEvent={handleUploaderEvent}
        ></lr-data-output>
      </lr-file-uploader-regular>
    </>
  );
};

export default FilesUploader;
