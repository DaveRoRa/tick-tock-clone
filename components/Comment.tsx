import Link from "next/link";
import { memo, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { CommentType } from "../types";
import { ProfilePic } from "./ProfilePic";
import Tooltip from "./Tooltip";

const Comment = ({ comment, likes, postedBy }: CommentType) => {
  const [userHover, setUserHover] = useState(false);
  const userId = useAuthStore(({ userProfile }) => userProfile?._id);
  const HeartComponent =
    userId && likes?.includes(userId) ? (
      <HiHeart className='text-tik text-xl cursor-pointer m-auto mb-[6px]' />
    ) : (
      <HiOutlineHeart className='text-gray-500 text-xl cursor-pointer m-auto mb-[6px]' />
    );

  const handleUserFocus = () => setUserHover(true);
  const handleUserBlur = () => setUserHover(false);
  return (
    <div className='w-full flex group/comment'>
      <Link href='#' onMouseEnter={handleUserFocus} onMouseLeave={handleUserBlur}>
        <ProfilePic
          size={40}
          name={postedBy.userName}
          src={postedBy.image}
          className='mr-3'
        />
      </Link>
      <div className='flex flex-col group flex-1'>
        <Link href='#' onMouseEnter={handleUserFocus} onMouseLeave={handleUserBlur}>
          <p className={`text-primary text-lg font-bold ${userHover && "underline"}`}>
            {postedBy.userName}
          </p>
        </Link>
        <p className='text-primary mb-[6px]'>{comment}</p>
      </div>
      <div className='flex flex-col justify-center'>
        {userId === postedBy._id && (
          <Tooltip
            content={
              <button className='text-slate-800 py-3 flex items-center pr-10 hover:text-tikD'>
                <MdDeleteOutline className='text-2xl' />
                <span className='ml-3 font-bold'>Delete</span>
              </button>
            }>
            <HiOutlineEllipsisHorizontal
              className={
                "invisible group-hover/comment:visible cursor-pointer text-3xl m-auto"
              }
            />
          </Tooltip>
        )}
        {HeartComponent}
        <p className='text-gray-400 text-xs text-center'>{likes ? likes.length : 0}</p>
      </div>
    </div>
  );
};

export default memo(Comment);
