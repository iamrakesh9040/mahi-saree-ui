import { WishListCard } from "@/components/card";
import { Skelton } from "@/core";
import { useSwr } from "@/hooks";
import AccountLayout from "@/layouts/my-account";
import { PublicLayout } from "@/layouts";

const WishList = () => {
  const { data: wishlistData, isValidating, mutate } = useSwr(`wishlist`);

  return (
    <PublicLayout title="Wishlist | Shree Odisha Handloom">
      <AccountLayout>
        <section className="main-container  flex flex-col gap-12 pb-12">
          <div className="text-2xl font-semibold text-center border-b-2 py-2">
            My Wishlist({wishlistData?.length} items)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-6">
            {isValidating ? (
              <>
                <Skelton />
                <Skelton />
                <Skelton />
                <Skelton />
                <Skelton />
                <Skelton />
                <Skelton />
                <Skelton />
              </>
            ) : wishlistData?.length > 0 ? (
              wishlistData?.map((curEle: any, i: number) => (
                <WishListCard item={curEle} mutate={mutate} key={curEle?._id} />
              ))
            ) : (
              <div className="w-full h-full lg:col-span-4 xl:col-span-5 col-span-2 flex items-center justify-center">
                <div className="flex items-center justify-center gap-3 flex-col">
                  <img
                    src="/emptyProduct.webp"
                    className="w-full h-full rounded-xl"
                    alt=""
                  />
                  <p className="text-xl font-semibold text-gray-800">
                    Your wishlist is empty
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

export default WishList;
