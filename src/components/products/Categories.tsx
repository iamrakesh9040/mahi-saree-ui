import { useSwr } from "@/hooks";

const Categories = ({ category, setCategory, setPageNo }: any) => {
  const { data, isValidating } = useSwr(`category`);
  return (
    <>
      {isValidating ? (
        <article className="flex flex-col gap-3 justify-center py-1">
          <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
            {" "}
          </aside>
          <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
            {" "}
          </aside>
          <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
            {" "}
          </aside>
          <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
            {" "}
          </aside>
          <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
            {" "}
          </aside>
          <aside className="w-full py-5 rounded-lg bg-gray-400 animate-pulse">
            {" "}
          </aside>
        </article>
      ) : (
        data?.map((item: any, index: number) => (
          <article
            className="flex flex-col gap-5 justify-center py-1"
            key={item?._id}
          >
            <aside
              onClick={() => {
                setCategory(item?._id);
                setPageNo(1);
              }}
              className="flex flex-col"
            >
              <div
                className={`flex items-center cursor-pointer gap-4 bg-gray-100  duration-200 rounded-md p-3
            ${item?._id === category ? `bg-primary/40` : `hover:bg-primary/40`}
            `}
              >
                <img
                  src={item?.image}
                  className="w-8 h-8 object-fill rounded-lg"
                  alt="categoryLogo"
                />
                <p className=" text-secondary font-medium">{item?.name}</p>
              </div>
            </aside>
          </article>
        ))
      )}
    </>
  );
};

export default Categories;
