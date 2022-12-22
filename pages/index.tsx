import { GetServerSideProps } from "next";
import { Sidebar } from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";

type HomeProps = {
  videos: Video[];
};

const Home = ({ videos }: HomeProps) => {

  return (
    <div className='flex flex-row h-[calc(100vh-54px)] w-full xl:w-[1200px] mx-0 xl:mx-auto'>
      <Sidebar />
      <div className='flex flex-col flex-1 gap-10 video pl-10 pc:pl-20 h-full overflow-auto'>
        {videos.length
          ? videos.map((vid) => <VideoCard post={vid} key={vid._id} />)
          : null}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`);

  return {
    props: {
      videos: await response.json()
    }
  };
};

export default Home;
