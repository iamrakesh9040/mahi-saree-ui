const Skelton = () => {
  return (
    <div className="relative bg-slate-100 h-full group overflow-hidden  w-full flex flex-col gap-2 justify-between items-center  shadow-[0px_0px_4px_0px_#00000024] rounded-lg p-4">
      <div className=" w-full flex  flex-col gap-4">
        <div>
          <div className=" w-full object-contain bg-slate-200 animate-pulse md:h-36 h-24 object-fil rounded-lg cursor-pointer group-hover:scale-105 duration-300 "></div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex md:flex-row flex-col md:items-center items-start justify-between">
            <p className="flex items-center gap-1">
              <span className="w-48 p-2 rounded bg-slate-200 animate-pulse "></span>
              {/* <span className="w-16 p-1 rounded bg-gray-200 animate-pulse"></span> */}
            </p>
            {/* <p className="w-10 p-2 rounded bg-slate-200 animate-pulse"></p> */}
          </div>
          <p className="w-40 p-2 bg-slate-200 animate-pulse rounded "></p>
          <span className="w-32 p-2 rounded bg-slate-200 animate-pulse"></span>
          <div className="flex justify-between items-center  ">
            <p className="flex flex-col sm:flex-row items-center gap-1">
              <span className="w-20 p-2 rounded bg-slate-200 animate-pulse"></span>
              <span className="w-20 p-2 rounded bg-slate-200 animate-pulse"></span>
            </p>
            <div>
              <p className=" w-10 h-10 rounded-md bg-slate-200 animate-pulse"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Skelton;
