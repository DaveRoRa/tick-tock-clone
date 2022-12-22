import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoChatbubbleEllipses, IoClose, IoVolumeMedium } from "react-icons/io5";
import { HiVolumeUp } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { ProfilePic } from "../../components/ProfilePic";
import { Video } from "../../types";
import Comment from "../../components/Comment";
import { calculatePassedTime } from "../../utils/misc";
import Tooltip from "../../components/Tooltip";
import LogoCropped from "../../utils/tik-tik-cropped.jpg";
import Slider from "../../components/Slider";
import useVideoController from "../../hooks/useVideoController";
import Image from "next/image";

const MainVideo = ({ url }: Video["video"]) => {
  const [bgImage, setBgImage] = useState("");

  const { videoRef } = useVideoController();

  const handleLoadedMetadata = () => {
    const canvasElement = document.createElement("canvas");
    const currentVideo = videoRef.current as HTMLVideoElement;
    console.log("currentVideo", currentVideo);
    const canvasX = canvasElement.getContext("2d");
    console.log("canvasX", canvasX);
    console.log("currentVideo", {
      width: currentVideo.videoWidth,
      height: currentVideo.videoHeight
    });

    canvasX?.drawImage(
      currentVideo,
      0,
      0,
      currentVideo.videoWidth,
      currentVideo.videoHeight
    );
    console.log("canvasX2", canvasX);

    const tumbnailURL = canvasElement.toDataURL();
    console.log("canvasFinal", canvasElement);

    console.log("tumbnailURL", tumbnailURL);
  };

  return (
    <div className={`bg-zinc-700 bg-opacity-80 h-full flex-1 relative`}>
      <video
        onLoadedMetadata={handleLoadedMetadata}
        ref={videoRef}
        src={url}
        className='w-full h-full'
      />
      <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full z-[-1]'>
        <div
          style={{ backdropFilter: "blur(16px)" }}
          className='absolute top-0 left-0 right-0 bottom-0 w-full h-full'></div>
        <Image
          className='w-full h-full'
          src={LogoCropped}
          priority
          alt='background-image'
        />
      </div>
      <div className='absolute top-5 left-5 flex gap-8'>
        <button>
          <IoClose
            className={
              "text-white text-[2.5rem] p-1 rounded-full hover:opacity-30 " +
              " bg-zinc-700 transition-all"
            }
          />
        </button>
        <ProfilePic src={LogoCropped} size={36} />
      </div>
      <div className='group/volume absolute bottom-4 right-5 flex flex-col items-center gap-2'>
        <Slider />
        <button>
          <HiVolumeUp
            className={
              "text-white text-[2.6rem] p-2 rounded-full " +
              " bg-zinc-700 transition-all hover:opacity-30"
            }
          />
        </button>
      </div>
    </div>
  );
};

const DetailsPanel = ({
  postedBy,
  caption,
  host,
  comments,
  _createdAt
}: Omit<Video, "video"> & { host: string }) => {
  const { asPath } = useRouter();
  const createdDate = useMemo(
    () => new Date(_createdAt).toLocaleDateString(),
    [_createdAt]
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(host + asPath);
    toast("Copied");
  };

  return (
    <div className='w-[544px] h-full flex flex-col justify-between'>
      <div className='px-8 flex flex-col mt-8  '>
        <Link href='#' className='group/profile w-full pt-[22px] pb-[15px]  flex'>
          <ProfilePic
            className='mr-3'
            src={postedBy.image}
            size={40}
            name={postedBy.userName}
          />
          <div className='flex flex-col flex-1'>
            <p className='text-primary text-lg group-hover/profile:underline font-bold leading-5'>
              {postedBy.userName}
            </p>
            <p className='text-gray-600 text-sm line'>
              {postedBy.userName}
              <span className='mx-2'>&#8226;</span>
              <Tooltip side='bottom' content={<div>{createdDate}</div>}>
                {calculatePassedTime(_createdAt)}
              </Tooltip>
            </p>
          </div>
        </Link>
        <p className='leading-[22px] text-gray-700'>{caption}</p>
        <div className='my-4 w-full flex-col'>
          <div className='flex w-full'>
            <div className='flex items-center'>
              <AiFillHeart
                className={
                  "text-slate-800 p-1 mr-[6px] bg-gray-100 rounded-full text-3xl"
                }
              />
              <p className='text-xs text-gray-600 font-bold'>100</p>
            </div>
            <div className='flex items-center ml-4'>
              <IoChatbubbleEllipses className='text-slate-800 p-1 mr-[6px] bg-gray-100 rounded-full text-3xl' />
              <p className='text-xs text-gray-600 font-bold'>100</p>
            </div>
          </div>
          <div
            className={
              "w-full flex justify-between bg-gray-100 mt-4" +
              " border-2 border-gray-300 rounded-sm"
            }>
            <div
              className={
                "pt-[7px] text-gray-500 pb-[5px] flex-1 pl-3" +
                " text-sm text-ellipsis whitespace-nowrap overflow-hidden"
              }>
              {host + asPath}
            </div>
            <button
              onClick={handleCopyLink}
              className='px-[18px] py-[7px] hover:bg-gray-50 font-bold text-sm text-slate-900'>
              Copy link
            </button>
          </div>
        </div>
      </div>
      {comments && !!comments.length && (
        <div className='w-full flex-1 bg-gray-100 overscroll-y-auto border-y-2 border-gray-300'>
          <div className='px-8 py-6 flex flex-col gap-4'>
            {comments.map((com) => (
              <Comment key={com._key} {...com} />
            ))}
          </div>
        </div>
      )}
      <div className='pl-[30px] pr-3 py-[21px] w-full'>
        <div className='w-full flex'>
          <input
            className={
              "rounded-md flex-1 outline-none bg-gray-100 focus:border-gray-300" +
              " px-[10px] py-2 text-sm border-2 text-gray-600 border-gray-100"
            }
          />
          <button
            disabled
            className={
              "text-tik rounded text-sm ml-2 disabled:text-gray-300" +
              " disabled:hover:bg-inherit hover:bg-tikL px-4"
            }>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailsPage = ({ postDetails, host }: { postDetails: Video; host: string }) => {
  const { video, ...details } = postDetails;

  if (!postDetails) {
    return null;
  }

  return (
    <div className='flex w-[100vw] h-[100vh] overflow-hidden flex-row'>
      <MainVideo {...video} />
      <DetailsPanel host={host} {...details} />
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
  req: {
    headers: { host }
  }
}: {
  params: { id: string };
  req: { headers: { host: string } };
}) => {
  const responseClient = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/${id}`);
  const responseDeserealized = await responseClient.json();

  return { props: { postDetails: responseDeserealized[0], host } };
};

export default DetailsPage;
