import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { AiFillStar, AiTwotoneDislike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import useMutation from "@/hooks/useMutation";
import { Dialog } from "@mui/material";
import { ExpandText, Ratings } from "../common";

const ReviewAndRating = ({
  productId,
  rating,
  mutate,
  star,
}: {
  productId: string;
  rating: any;
  mutate: () => void;
  star: number;
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { isLoading, mutation } = useMutation();
  const [showMore, setShowMore] = useState(1);
  const [allImages, setAllImages] = useState<any>();
  const [imageOpen, setImageOpen] = useState(false);
  const [imageOpenAll, setImageOpenAll] = useState(false);
  const handleLike = async (id: string) => {
    try {
      const res = await mutation(`rating/like/${id}`, {
        method: "PUT",
        isAlert: true,
        body: {},
      });
      if (res?.status === 200) {
        mutate();
        toast.success(res?.results?.msg);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (id: string) => {
    try {
      const res = await mutation(`rating/dislike/${id}`, {
        method: "PUT",
        isAlert: true,
        body: {},
      });
      if (res?.status === 200) {
        mutate();
        toast.success(res?.results?.msg);
      } else {
        toast.error(res?.results?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allReviewImages = rating?.map((item: any) =>
    item?.images?.map((pre: any) => pre?.image)
  );

  // Flatten the array of arrays into a single array
  const flattenedImages = allReviewImages?.flat();

  // Assuming 'starll' is a typo, I'll assume you meant 'stall' for each image URL
  const finalImages = flattenedImages?.map((imageUrl: any) => {
    return imageUrl;
  });
  return (
    <>
      <AllImages
        open={imageOpen}
        close={() => setImageOpen(false)}
        item={allImages}
      />
      <ImagesAll
        open={imageOpenAll}
        close={() => setImageOpenAll(false)}
        item={allImages}
      />
      <Ratings
        open={open}
        close={() => setOpen(false)}
        productId={productId}
        mutate={mutate}
      />
      <div
        id="ReviewAndRating"
        className="w-full h-full border flex flex-col gap-5 rounded-md"
      >
        <div className="px-4 py-2 flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">
            Ratings & Reviews
          </span>
          {/* <p
            onClick={() => {
              if (user?._id) {
                setOpen(true);
                return;
              }
              toast.info("Please login first then give review");
            }}
            className="px-6 py-2 rounded-md shadow-md cursor-pointer text-gray-800 font-semibold"
          >
            Rate Product
          </p> */}
        </div>
        <div className="w-full px-4 grid lg:flex grid-cols-2 gap-5 items-center">
          <div className="flex flex-col gap-2 md:w-[30%] items-center ">
            <p className="flex items-center gap-1 text-3xl text-gray-800 font-semibold">
              <span>{star}</span>
              <span>
                <AiFillStar className=" text-amber-500" />
              </span>
            </p>
            <p className="text-sm text-center text-gray-400">
              {rating?.length} Ratings & Reviews
            </p>
          </div>
          <div className="w-full grid lg:hidden grid-cols-2 items-center gap-5  relative">
            {finalImages && finalImages?.length > 2 && (
              <span
                onClick={() => {
                  setImageOpenAll(true);
                  setAllImages(finalImages);
                }}
                className=" absolute top-1 right-0 w-16 h-16 bg-black rounded-md bg-opacity-70 cursor-pointer lg:hidden flex items-center justify-center text-white font-semibold tracking-wide text-xs "
              >
                View
              </span>
            )}
            {finalImages?.slice(0, 2)?.map((item: string, i: number) => (
              <div
                key={i}
                className="w-full h-fit p-2 rounded-lg flex border items-center justify-center"
              >
                <img src={item} className="w-full h-full object-fill" alt="" />
              </div>
            ))}
          </div>
          <div className="w-full lg:grid hidden grid-cols-6 items-center gap-5  relative">
            {finalImages && finalImages?.length > 6 && (
              <span
                onClick={() => {
                  setImageOpenAll(true);
                  setAllImages(finalImages);
                }}
                className=" absolute top-1 right-0 w-20 h-20 bg-black rounded-md bg-opacity-70 cursor-pointer hidden lg:flex items-center justify-center text-white font-semibold tracking-wide text-xs "
              >
                View
              </span>
            )}
            {finalImages?.slice(0, 6)?.map((item: string, i: number) => (
              <div
                key={i}
                className="w-full h-fit p-2 rounded-lg flex border items-center justify-center"
              >
                <img src={item} className="w-full h-full object-fill" alt="" />
              </div>
            ))}
          </div>
        </div>

        <hr />
        {rating?.slice(0, showMore)?.map((item: any, index: number) => {
          return (
            <div key={item._id} className="">
              <div className=" w-full flex flex-col gap-4 px-4 pb-4">
                <p className=" flex gap-4 items-center">
                  <span
                    className={`flex items-center text-white  px-2 py-0.5 rounded text-sm ${
                      item?.start <= 1
                        ? `bg-red-500`
                        : item?.start < 4
                        ? `bg-orange-500 `
                        : `bg-green-600`
                    }`}
                  >
                    {item.star}
                    <AiFillStar />
                  </span>
                  <span className=" font-semibold text-sm">{item.title}</span>
                </p>
                <ExpandText text={item.msg} limit={20} />
                <p className=" flex gap-1 items-center relative lg:hidden">
                  {item?.images && item?.images?.length > 4 && (
                    <span
                      onClick={() => {
                        setImageOpen(true);
                        setAllImages(item?.images);
                      }}
                      className=" absolute top-1 right-0 w-14 h-14 bg-black rounded-md bg-opacity-70 cursor-pointer lg:hidden flex items-center justify-center text-white font-semibold tracking-wide text-xs "
                    >
                      View
                    </span>
                  )}

                  {item?.images?.slice(0, 5)?.map((imgItem: any) => {
                    return (
                      <img
                        key={imgItem._id}
                        src={imgItem.image}
                        className=" w-16 h-16 object-contain p-2 border rounded-md"
                        alt=""
                      />
                    );
                  })}
                </p>
                <p className=" lg:flex hidden gap-1 items-center relative ">
                  {item?.images && item?.images?.length > 12 && (
                    <span
                      onClick={() => {
                        setImageOpen(true);
                        setAllImages(item?.images);
                      }}
                      className=" absolute top-1 right-0 w-14 h-14 bg-black rounded-md bg-opacity-70 cursor-pointer hidden lg:flex items-center justify-center text-white font-semibold tracking-wide text-xs "
                    >
                      View
                    </span>
                  )}
                  {item?.images?.slice(0, 12)?.map((imgItem: any) => {
                    return (
                      <img
                        key={imgItem._id}
                        src={imgItem.image}
                        className=" w-16 h-16 object-contain p-2 border rounded-md"
                        alt=""
                      />
                    );
                  })}
                </p>
                <div className=" flex flex-col md:flex-row md:items-center gap-3 justify-between">
                  <div className=" w-full  justify-between flex items-center gap-2 text-xs text-gray-600">
                    <p className=" font-semibold">{item.user?.name}</p>
                    <p className=" flex items-center ">
                      <BsFillCheckCircleFill className=" text-green-600" />{" "}
                      <span>Certified Buyer, {item.address}</span>
                    </p>
                  </div>
                  <div className=" flex items-center gap-5  text-lg text-gray-800">
                    <p className=" flex items-center gap-3">
                      {isLoading ? (
                        <div
                          className="w-7 h-7 rounded-full animate-spin
                    border-y border-solid border-green-500 border-t-transparent shadow-md"
                        ></div>
                      ) : (
                        <BiSolidLike
                          onClick={() => {
                            if (!user?._id) {
                              toast.warning("User is not logged in");
                            } else {
                              handleLike(item?._id);
                            }
                          }}
                          className=" cursor-pointer"
                        />
                      )}
                      <span className=" text-sm font-semibold text-gray-600">
                        {item.like}
                      </span>
                    </p>
                    <p className=" flex items-center gap-3">
                      {isLoading ? (
                        <div
                          className="w-7 h-7 rounded-full animate-spin
                      border-y border-solid border-green-500 border-t-transparent shadow-md"
                        ></div>
                      ) : (
                        <AiTwotoneDislike
                          onClick={() => {
                            if (!user?._id) {
                              toast.warning("User is not logged in");
                            } else {
                              handleDislike(item?._id);
                            }
                          }}
                          className=" cursor-pointer"
                        />
                      )}

                      <span className=" text-sm font-semibold text-gray-600">
                        {item.dislike}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
        {showMore === 1 && (
          <button
            onClick={() => setShowMore(rating?.length)}
            className="p-3 text-blue-500 cursor-pointer hover:underline font-semibold text-left"
          >
            Show all of {rating?.length} reviews.
          </button>
        )}
        {showMore > 1 && (
          <button
            onClick={() => setShowMore(1)}
            className="p-3 text-blue-500 cursor-pointer hover:underline font-semibold text-left"
          >
            Show less
          </button>
        )}
      </div>
    </>
  );
};

export default ReviewAndRating;

const AllImages = ({ open, close, item }: any) => {
  return (
    <Dialog
      open={open}
      onClose={() => close(false)}
      maxWidth="xl"
      PaperProps={{
        style: {
          borderRadius: 18,
        },
      }}
    >
      <div className="md:w-[30rem] w-full flex flex-col gap-5 p-5">
        <p className="text-xl font-medium text-gray-800">Review All Images</p>
        <div className="w-full grid grid-cols-4 gap-5 items-center">
          {item?.map((pre: any, i: number) => (
            <div
              key={i}
              className="w-full h-14 rounded-lg border flex items-center justify-center p-2"
            >
              <img
                src={pre?.imageUrl}
                className="w-full h-full object-fill"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
const ImagesAll = ({ open, close, item }: any) => {
  return (
    <Dialog
      open={open}
      onClose={() => close(false)}
      maxWidth="xl"
      PaperProps={{
        style: {
          borderRadius: 18,
        },
      }}
    >
      <div className="md:w-[40rem] w-full flex flex-col gap-5 p-5">
        <p className="text-xl font-medium text-gray-800">Review All Images</p>
        <div className="w-full grid grid-cols-4 gap-5 items-center">
          {item?.map((pre: any, i: number) => (
            <div
              key={i}
              className="w-full h-20 rounded-lg border flex items-center justify-center p-2"
            >
              <img src={pre} className="w-full h-full object-fill" alt="" />
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
