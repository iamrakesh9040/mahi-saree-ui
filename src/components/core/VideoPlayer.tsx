
import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
interface VideoPlayerProps {
    src: string;
    width?: string;
    height?: string;
    isVisible: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, isVisible }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className={`relative w-full h-full group`}>
            <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-lg"
            >
                <source src={src} type="video/mp4" />
            </video>
            <div className="w-full h-full bg-black absolute top-0 left-0  rounded-lg bg-opacity-40 z-0">

            </div>
            <div className=" absolute top-5 right-5  flex-col gap-5 z-10 group-hover:flex hidden">
                <IoHeart className=" text-2xl text-gray-300 cursor-pointer" />
                <MdRemoveRedEye className=" text-2xl text-gray-300 cursor-pointer" />
            </div>
            {
                isVisible &&
                <div className=" absolute top-0 left-0 group w-full h-full flex items-center justify-center">
                    {
                        isPlaying ?
                            <FaPause onClick={togglePlayPause} className=" text-5xl text-white cursor-pointer group-hover:block hidden" /> :
                            <FaPlay onClick={togglePlayPause} className=" text-5xl text-white cursor-pointer" />
                    }
                </div>
            }
        </div>
    );
};

export default VideoPlayer;
