import { useState } from "react";
import { AdminLayout } from "@/layouts";
import { Drawer } from "@mui/material";
import { BiPlus } from "react-icons/bi";
import { useSwr } from "@/hooks";
import { AddColorForm } from "@/components/forms";
import { ColorCard } from "@/components/card";

type ColorType = {
  id: string;
  color: string;
};

export default function ManageColor({ curUser }: { curUser: ColorType }) {
  const [addColorDrawer, setAddColorDrawer] = useState(false);
  const { data, mutate } = useSwr(`color`);

  return (
    <AdminLayout title="Manage Color | Shree Odisha Handloom">
      <section className="p-5 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 md:items-center pb-6">
          <h1 className="text-4xl font-semibold">Manage Color</h1>
          <div>
            <Drawer
              anchor="right"
              open={addColorDrawer}
              onClose={() => setAddColorDrawer(false)}
            >
              {/* <ColorForm setAddColorDrawer={setAddColorDrawer} /> */}
              <AddColorForm
                mutate={mutate}
                setAddColorDrawer={setAddColorDrawer}
              />
            </Drawer>
            <div className="rounded-lg w-full grid grid-cols-12 panel-crd gap-4">
              <div className="col-span-full flex justify-end w-full">
                <div className="flex justify-end">
                  <div
                    className="relative w-full !rounded-md"
                    onClick={() => setAddColorDrawer(true)}
                  >
                    <div className="common-transition flex group gap-2 items-center justify-between shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-md w-full h-full py-2 px-4 cursor-pointer bg-primary">
                      <div className="flex items-center gap-3">
                        <BiPlus className="!text-xl text-white" />
                        <div className="flex flex-col">
                          <p className="text-start font-semibold tracking-wide text-white">
                            Add Color
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          {/* {selectedColor && ( // Render the color card if a color is selected
            <div className="flex justify-center mt-4">
              <div
                className="w-32 h-32 rounded-lg shadow-md"
                style={{ backgroundColor: selectedColor }}
              ></div>
              <div className="ml-4">
                <p className="font-bold text-lg">Selected Color:</p>
                <p className="mt-1">{selectedColor}</p>
              </div>
            </div>
          )} */}
          {data && data.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 place-items-center lg:grid-cols-6 gap-5 mt-4">
              {data.map((item: any, i: number) => (
                <ColorCard key={i} colData={item} mutate={mutate} />
              ))}
            </div>
          ) : (
            <div>Data not found</div>
          )}
        </>
      </section>
    </AdminLayout>
  );
}
