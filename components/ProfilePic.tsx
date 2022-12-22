import Image, { StaticImageData } from "next/image";
import React from "react";

type ProfilePicProps = {
  src: string|StaticImageData;
  size: number;
  name?: string;
  className?: string;
};

export function ProfilePic({ src, size, name, className }: ProfilePicProps) {
  return (
    <div className={className}>
      <Image
        width={size}
        height={size}
        className='rounded-full'
        src={src}
        alt={name ? `${name} profile` : "Profile"}
      />
    </div>
  );
}
