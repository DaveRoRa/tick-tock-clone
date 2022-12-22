import { useCallback, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { useDropzone, FileRejection } from "react-dropzone";
import { client } from "../utils/client";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";
import axios from "axios";
import { useRouter } from "next/router";

const accept = {
  "video/mp4": [".mp4", ".m4v"],
  "video/webm": [".webm"]
};

const ERROR_FORMAT = "File type must be video/mp4,.mp4,.m4v,video/webm,.webm";

const getVideoDuration = (urlVideo: string) => {
  const videoElement = document.createElement("video");
  videoElement.preload = "metadata";
  videoElement.src = urlVideo;
  return new Promise<number>((resolve, reject) => {
    const callbackEvent = () => {
      videoElement.removeEventListener("loadedmetadata", callbackEvent);
      if (isNaN(videoElement.duration)) {
        reject("Not a number");
      } else {
        resolve(videoElement.duration);
      }
    };
    return videoElement.addEventListener("loadedmetadata", callbackEvent, { once: true });
  });
};

const getErrorOnFiles = async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
  if (acceptedFiles.length + rejectedFiles.length > 1) {
    return { error: "Only one video can be uploaded at a time", url: "" };
  }
  if (acceptedFiles.length + rejectedFiles.length < 1) {
    return { error: "You must upload at least one existing video", url: "" };
  }
  if (rejectedFiles.length) {
    if (rejectedFiles[0].errors.some(({ message }) => message === ERROR_FORMAT)) {
      return { error: "Invalid format", url: "" };
    }
    return {
      error: rejectedFiles[0].errors.reduce<string>(
        (finalMessage, { message }, currentIndex) => {
          if (!currentIndex) {
            return message + ". ";
          }
          return finalMessage + message + ". ";
        },
        ""
      ),
      url: ""
    };
  }
  if (acceptedFiles[0].size > 10485760) {
    return { error: "Videos must be 10MB or less", url: "" };
  }
  const urlVideo = URL.createObjectURL(acceptedFiles[0]);
  const duration = await getVideoDuration(urlVideo);
  if (duration > 180) {
    return { error: "Video must me 3 minutes long or less", url: "" };
  }

  return { error: "", url: urlVideo };
};

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const { error, url } = await getErrorOnFiles(acceptedFiles, rejectedFiles);
      setRejectionReason(error);
      setVideoUrl(url);
      if (!error) {
        setVideoAsset(acceptedFiles[0]);
      } else {
        setVideoAsset(null);
      }
    },
    []
  );
  const { isDragActive, getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept,
    multiple: false
  });
  const { userProfile, handleOpenModalLogin } = useAuthStore(
    ({ userProfile, handleOpenModalLogin }) => ({ userProfile, handleOpenModalLogin })
  );
  const router = useRouter();
  const cleanVideo = () => {
    setVideoAsset(null);
    setVideoUrl("");
  };

  const handleDiscard = () => {
    setVideoAsset(null);
    setVideoUrl("");
    setRejectionReason("");
    setCaption("");
    setCategory(topics[0].name);
  };

  const disabledButton = !category || !caption || !videoUrl || !videoAsset;

  const uploadVideo = async () => {
    if (!disabledButton && userProfile) {
      setUploading(true);
      const data = await client.assets.upload("file", videoAsset, {
        contentType: videoAsset.type,
        filename: videoAsset.name
      });
      const postDocument = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: data._id
          }
        },
        postedBy: {
          _type: "reference",
          _ref: userProfile._id
        },
        topic: category
      };
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, postDocument);
      router.push("/");
    }
  };

  return (
    <div className='md:bg-gray-100 w-full h-full py-4 overflow-x-hidden overflow-y-auto'>
      <div className='md:w-[688px] md:mx-auto px-14 md:py-6 pb-4 bg-white md:rounded-lg md:shadow-md'>
        <div className='w-full'>
          <h2 className='text-2xl font-bold'>Upload Video</h2>
          <h3 className='text-gray-400 mt-1'>Post a video to your account</h3>
        </div>
        <div className='flex gap-10 flex-col md:flex-row'>
          <div className='mb-10 flex flex-col justify-center'>
            <div
              {...getRootProps()}
              className={
                "rounded-lg border-2 border-gray-300 flex flex-col" +
                " justify-center items-center outline-none mt-10 w-[260px] h-[460px]" +
                ` cursor-pointer ${!videoUrl && "hover:border-tik hover:bg-tikL"}` +
                ` border-dashed ${isDragActive && "border-tik bg-tikL"}`
              }>
              {videoAsset && !isDragActive ? (
                <div className='group relative w-full h-full'>
                  <video
                    src={videoUrl}
                    loop
                    controls
                    className='rounded-xl h-[450px] bg-black'
                  />
                  <button
                    onClick={cleanVideo}
                    disabled={uploading}
                    className={
                      "group-hover:block transition-all hidden absolute top-5 right-5 p-1 rounded-full" +
                      " bg-white text-tik text-xl hover:bg-tik hover:text-white" +
                      " group-hover:disabled:hidden"
                    }>
                    <IoClose />
                  </button>
                </div>
              ) : (
                <>
                  <div className={"cursor-pointer h-full w-full"}>
                    <div className='flex flex-col w-full items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-lg mb-2 font-semibold text-primary'>
                          Select video to upload
                        </p>
                        <p className='text-sm text-gray-500'>Or drag and drop a file</p>
                      </div>
                      <p className='mt-10 text-sm text-gray-400 text-center leading-7'>
                        MP4 or WebM <br /> Up to 3 minutes
                        <br /> Less than 10MB
                      </p>
                      <button className='rounded-sm bg-tik px-14 py-2 mt-8 text-white'>
                        Select file
                      </button>
                    </div>
                  </div>
                  <input
                    {...getInputProps({ accept: "video/mp4, video/webm" })}
                    name='upload-file'
                    className='hidden'
                  />
                </>
              )}
            </div>
            {rejectionReason && (
              <p className='text-center break-words flex-wrap text-xl text-red-400 font-semibold mt-4 w-[252px]'>
                {rejectionReason}
              </p>
            )}
          </div>
          <div className='lg:mt-10 lg:h-[460px] flex items-center flex-1 '>
            <div className='flex flex-col gap-3 w-full md:mr-20'>
              <label htmlFor='caption' className='font-medium'>
                Caption
              </label>
              <input
                disabled={uploading}
                name='caption'
                type='text'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={
                  "rounded py-3 px-4 text-sm outline-none md:w-[276px] w-full" +
                  " disabled:text-gray-300 disabled:bg-gray-100 border-gray-200 border-2 p-2"
                }
              />
              <label htmlFor='category' className='font-medium'>
                Choose a category
              </label>
              <select
                name='category'
                disabled={uploading}
                className={
                  "outline-none py-3 px-4 text-sm border-2 border-gray-200" +
                  " disabled:text-gray-300 capitalize rounded md:w-[276px] w-full" +
                  " cursor-pointer disabled:cursor-default disabled:bg-gray-100 relative"
                }
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                {topics.map((topic) => (
                  <option
                    className='outline-none capitalize bg-white text-gray-700 p-2 hover:bg-slate-300'
                    key={topic.name}
                    value={topic.name}>
                    {topic.name}
                  </option>
                ))}
              </select>
              <div className='flex gap-6 mt-10'>
                <button
                  disabled={uploading}
                  onClick={handleDiscard}
                  type='button'
                  className={
                    "border-gray-300 hover:bg-gray-100 disabled:text-gray-300" +
                    " border-2 font-medium p-2 rounded-sm flex-1 outline-none disabled:hover:bg-inherit"
                  }>
                  Discard
                </button>
                {userProfile ? (
                  <button
                    onClick={uploadVideo}
                    type='button'
                    disabled={disabledButton || uploading}
                    className={`${
                      disabledButton
                        ? "bg-gray-100 text-gray-400"
                        : uploading
                          ? // eslint-disable-next-line indent
                          "text-white bg-tik border-tik"
                          : // eslint-disable-next-line indent
                          "hover:bg-tik border-tik hover:text-white text-tik bg-white"
                    } border-2  p-2 flex-1 rounded-sm outline-none font-medium`}>
                    {uploading ? (
                      <CgSpinner className='text-2xl animate-spin mx-auto' />
                    ) : (
                      "Post"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleOpenModalLogin}
                    className={
                      "hover:bg-tik border-tik hover:text-white text-tik" +
                      " bg-white border-2 rounded-sm p-2 flex-1 outline-none font-medium"
                    }>
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
