import React, { useState } from "react";
import {
  BsInstagram,
  BsLinkedin,
  BsPencilSquare,
  BsPinterest,
  BsYoutube,
} from "react-icons/bs";
import { SocialLinks } from ".";
import { AiFillFacebook } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

const SocialLinkEditForm = () => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const Info = [
    {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
      pinterest: "https://pinterest.com",
      playStore: "https://playStore.com",
      appStore: "https://appStore.com",
    },
  ];
  const handleEditClick = () => {
    setIsEditFormVisible(true);
  };
  return (
    <>
      {isEditFormVisible ? (
        <SocialLinks />
      ) : (
        <div className="w-full pt-4">
          {Info.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-4 text-gray-600"
            >
              <div className=" w-full flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-600 ">
                    Social Links
                  </p>
                  <button
                    onClick={handleEditClick}
                    className=" text-2xl text-green-500"
                  >
                    <BsPencilSquare />
                  </button>
                </div>

                <div className=" w-full flex justify-between items-center gap-4">
                  <div className="relative w-full">
                    <div className="block  py-4 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <AiFillFacebook className=" text-2xl text-facebook rounded" />
                        <p className=" outline-none p-1">{item.facebook}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-facebook  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        FaceBook
                      </label>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <div className="block  py-4 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <FaTwitter className=" text-2xl text-twitter rounded" />
                        <p className=" outline-none p-1">{item.twitter}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-twitter  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        Twitter
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" w-full flex justify-between items-center gap-4">
                  <div className="relative w-full">
                    <div className="block  pt-5 pb-3 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <BsPinterest className=" text-2xl text-pinterest rounded" />
                        <p className=" outline-none p-1">{item.pinterest}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-pinterest  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        Pinterest
                      </label>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <div className="block  py-4 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <BsLinkedin className=" text-2xl text-linkedin rounded" />
                        <p className=" outline-none p-1">{item.linkedin}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-linkedin  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        LinkedIn
                      </label>
                    </div>
                  </div>
                </div>
                <div className=" w-full flex justify-between items-center gap-4">
                  <div className="relative w-full">
                    <div className="block  pt-5 pb-3 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <BsInstagram className=" text-2xl  text-instagram rounded" />
                        <p className=" outline-none p-1">{item.instagram}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-instagram  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        Instagram
                      </label>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <div className="block  py-4 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <BsYoutube className=" text-2xl  text-youtube rounded" />
                        <p className=" outline-none p-1">{item.youtube}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-youtube  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        Youtube
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className=" w-full flex flex-col gap-5">
                <p className="text-xl font-semibold text-gray-600">App Links</p>
                <div className=" w-full flex justify-between items-center gap-4">
                  <div className="relative w-full">
                    <div className="block  py-4 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <img
                          src="/home/playstore.png"
                          className=" w-7 h-7"
                          alt=""
                        />
                        <p className=" outline-none p-1">{item.playStore}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-blue-600  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        PlayStore
                      </label>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <div className="block  py-4 px-3  w-full ring-1  ring-gray-300  text-gray-900 bg-transparent rounded-lg border-1 border-green-600 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer ">
                      <div className=" flex items-center gap-3">
                        <img
                          src="/home/app-store.png"
                          className=" w-7 h-7"
                          alt=""
                        />
                        <p className=" outline-none p-1">{item.appStore}</p>
                      </div>

                      <label
                        htmlFor="outlined_success"
                        className="absolute text-base text-blue-600  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
                      >
                        AppStore
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SocialLinkEditForm;
