import { Footer, ShowData, SocialLinks } from "@/components/site-setting";
import { AdminLayout } from "@/layouts";
import React, { useState } from "react";

export const SETTINGS_ARR = [
  {
    id: "1",
    name: "footer",
  },
  {
    id: "3",
    name: "show footer data",
  },
  {
    id: "2",
    name: "social links",
  },
];
const SiteSettings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handelSetting = (id: number) => {
    setActiveIndex(id);
  };
  let data;
  switch (activeIndex) {
    case 0:
      // Content for the 'footer' settings
      data = <Footer />;
      break;
    case 1:
      // Content for the 'social links' settings
      data = <ShowData />;
      break;
    case 2:
      // Content for the 'social links' settings
      data = <SocialLinks />;
      break;
    default:
      // Default content when no case matches
      data = <Footer />;
  }
  return (
    <AdminLayout>
      <div className="w-full lg:p-8 p-4">
        <div className="w-full  bg-white rounded-lg shadow-[0px_0px_5px_1px_#00000024] py-4 px-6 flex flex-col gap-1">
          {/* <div className="flex justify-between items-center"> */}
          <div className="flex lg:gap-8 gap-2  w-full p-2">
            {SETTINGS_ARR.map((item, index) => {
              return (
                <p
                  onClick={() => handelSetting(index)}
                  key={item.id}
                  className={`px-4 py-2 border  border-blue-500 border-transparent uppercase rounded-md lg:text-base text-sm cursor-pointer lg:font-semibold  common-transition  
                    ${
                      activeIndex === index
                        ? " text-blue-500   bg-blue-50  "
                        : "hover:text-primary  text-gray-700"
                    }
                    `}
                >
                  {item.name}
                </p>
              );
            })}
            {/* <div>
                <button>Show data</button>
              </div> */}
            {/* </div> */}
          </div>
          <p className="border-b w-full"></p>
          <div>{data}</div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SiteSettings;
