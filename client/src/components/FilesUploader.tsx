import { useState, useCallback, useRef, useEffect } from "react";
import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks";
import { useAddProofMutation } from "@/gql/generated/schema";

LR.registerBlocks(LR);

interface FilesUploaderProps {
  userEcoActionId: number;
}

const FilesUploader = ({ userEcoActionId }: FilesUploaderProps) => {
  const dataOutputRef = useRef<LR.DataOutput>();
  const [files, setFiles] = useState<any[]>([]);

  const [addProof] = useAddProofMutation();

  const handleUpload = async (data: any) => {
    try {
      await addProof({
        variables: {
          data: {
            userEcoActionId: userEcoActionId,
            proof: data[0].cdnUrl,
          },
        },
      });
      console.log("image uploaded");
      console.log(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploaderEvent = useCallback((e: CustomEvent<any>) => {
    const { data } = e.detail;
    setFiles(data);
    handleUpload(data);
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
