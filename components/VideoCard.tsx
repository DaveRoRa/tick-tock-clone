import { ProfilePic } from "./ProfilePic";
import { useState, useRef } from "react";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { Video } from "../types";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import useVideoController from "../hooks/useVideoController";

type VideoCardProps = {
  post: Video;
};

const VideoCard = ({ post }: VideoCardProps) => {
  const { videoRef, playing, isVideoMuted, handleMute, handlePlaying } =
    useVideoController();

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <ProfilePic src={post.postedBy.image} size={62} />
          </div>
          <div>
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-base font-bold text-primary'>
                  {post.postedBy.userName}{" "}
                  <GoVerified className='text-blue-500 text-md' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div className='rounded-3xl group/video'>
          <Link href={`/details/${post._id}`}>
            <video
              ref={videoRef}
              loop
              muted={isVideoMuted}
              className={
                "lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px]" +
                " rounded-2xl cursor-pointer bg-gray-100"
              }
              src={post.video.url}></video>
          </Link>
          <div
            className={
              "absolute bottom-6 hidden group-hover/video:block left-8 md:left-14 p-3" +
              " lg:left-0 flex gap-10 lg:justify-between"
            }>
            <button onClick={handlePlaying} className='text-black text-2xl lg:text-4xl'>
              {playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
            </button>
            <button onClick={handleMute} className='text-black text-2xl lg:text-4xl'>
              {isVideoMuted ? <HiVolumeOff /> : <HiVolumeUp />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
