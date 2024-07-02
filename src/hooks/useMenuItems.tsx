import { useRouter } from "next/router";
import path from "path";
import {
  AiOutlineBell,
  AiOutlineDollarCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiBox, BiLayer, BiSupport } from "react-icons/bi";
import {
  BsTruck,
  BsGear,
  BsChatSquareText,
  BsKey,
  BsBagCheck,
  BsCartCheck,
  BsGearWideConnected,
  BsCardImage,
  BsPersonGear,
} from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import {
  IoAddOutline,
  IoPersonAddOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import {
  MdContentPaste,
  MdOutlineCategory,
  MdOutlineColorLens,
  MdOutlineImage,
  MdOutlineInstallMobile,
  MdOutlineLocalOffer,
  MdOutlineLocalShipping,
  MdOutlineMobileFriendly,
  MdOutlinePersonAddAlt,
  MdOutlinePrivacyTip,
  MdPeopleOutline,
} from "react-icons/md";
import {
  RiCoupon4Line,
  RiFeedbackLine,
  RiImage2Line,
  RiTruckLine,
} from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbTruckReturn } from "react-icons/tb";

const useMenuItems = () => {
  const { query } = useRouter();
  const role = query?.role;
  switch (role) {
    case "admin":
      return [
        {
          _id: "1",
          title: "Dashboard",
          route: `/panel/admin`,
          icon: <RxDashboard className="text-xl" />,
        },
        {
          _id: "2",
          title: "Users",
          path: `/panel/admin/users`,
          icon: <HiOutlineUsers className="text-xl" />,
          submenus: [
            {
              _id: "2.1",
              title: "Customers",
              route: `/panel/admin/users/customers`,
              icon: <HiOutlineUserGroup className="text-xl" />,
            },
          ],
        },
        {
          _id: "3",
          title: "Category",
          route: "/panel/admin/categories",
          icon: <BiLayer className="text-xl" />,
        },
        {
          _id: "4",
          title: "Brands",
          route: "/panel/admin/brands",
          icon: <MdOutlineCategory className="text-xl" />,
        },
        {
          _id: "5",
          title: "Product",
          path: `/panel/admin/products`,
          icon: <FiShoppingCart className="text-xl" />,
          submenus: [
            {
              _id: "5.1",
              title: "Add New Product",
              route: `/panel/admin/products/add-product`,
              icon: <IoAddOutline className="text-xl" />,
            },
            {
              _id: "5.2",
              title: "Manage Products",
              route: `/panel/admin/products/manage-products`,
              icon: <BiBox className="text-xl" />,
            },
          ],
        },
        {
          _id: "6",
          title: "Orders",
          path: `/panel/admin/orders`,
          icon: <HiOutlineShoppingBag className="text-xl" />,
          submenus: [
            {
              _id: "6.1",
              title: "Manage Orders",
              route: `/panel/admin/orders/manage-orders`,
              icon: <BiBox className="text-xl" />,
            },
          ],
        },
        {
          _id: "7",
          title: "Manage Offer",
          route: "/panel/admin/manage-offer",
          icon: <MdOutlineLocalOffer className="text-xl" />,
        },
        {
          _id: "8",
          title: "Manage Coupons",
          route: "/panel/admin/manage-coupons",
          icon: <RiCoupon4Line className="text-xl" />,
        },
        {
          _id: "9",
          title: "Seller",
          path: `/panel/admin/sellers`,
          icon: <BsPersonGear className="text-xl" />,
          submenus: [
            {
              _id: "9.1",
              title: "Seller Requests",
              route: `/panel/admin/sellers/seller-request`,
              icon: <MdOutlinePersonAddAlt className="text-xl" />,
            },
            {
              _id: "9.2",
              title: "All Sellers",
              route: `/panel/admin/sellers`,
              icon: <MdPeopleOutline className="text-xl" />,
            },
          ],
        },

        {
          _id: "10",
          title: "Support",
          path: `/panel/admin/support`,
          icon: <BiSupport className="text-xl" />,
          submenus: [
            {
              _id: "10.1",
              title: "Manage Support",
              route: `/panel/admin/support/manage-support`,
              icon: <BsCartCheck className="text-xl" />,
            },
            {
              _id: "10.2",
              title: "Order Support",
              route: `/panel/admin/support/order-support`,
              icon: <BsBagCheck className="text-xl" />,
            },
          ],
        },
        {
          _id: "11",
          title: "Config",
          path: "/panel/admin/config",
          icon: <MdOutlineMobileFriendly className="text-xl" />,
          submenus: [
            {
              _id: "11.1",
              title: "App Config",
              route: "/panel/admin/config/app-config",
              icon: <MdOutlineInstallMobile className="text-xl" />,
            },
            {
              _id: "11.2",
              title: "GST Config",
              route: "/panel/admin/config/gst",
              icon: <AiOutlineDollarCircle className="text-xl" />,
            },
            {
              _id: "11.3",
              title: "Delivery Charge",
              route: "/panel/admin/config/delivery",
              icon: <BsTruck className="text-xl" />,
            },

            {
              _id: "11.4",
              title: "Privacy Policy ",
              route: "/panel/admin/config/privacy-policy",
              icon: <MdOutlinePrivacyTip className="text-xl" />,
            },
            {
              _id: "11.5",
              title: "Term And Condition",
              route: "/panel/admin/config/term-condition",
              icon: <MdContentPaste className="text-xl" />,
            },
            {
              _id: "11.6",
              title: "Shipping Policy ",
              route: "/panel/admin/config/shipping-policy",
              icon: <MdOutlineLocalShipping className="text-xl" />,
            },
            {
              _id: "11.7",
              title: "Return Policy ",
              route: "/panel/admin/config/return-policy",
              icon: <TbTruckReturn className="text-xl" />,
            },
          ],
        },
        {
          _id: "12",
          title: "Manage Testimonial",
          route: "/panel/admin/manage-testimonial",
          icon: <RiFeedbackLine className="text-xl" />,
        },
        {
          _id: "13",
          title: "Reviews",
          route: `/panel/admin/reviews`,
          icon: <BsChatSquareText className="text-xl" />,
        },
        {
          _id: "14",
          title: "Site Settings",
          path: "/panel/admin/site-settings",
          icon: <BsGearWideConnected className="text-xl" />,
          submenus: [
            {
              _id: "14.1",
              title: "Manage Social Links",
              route: "/panel/admin/site-settings/social-links",
              icon: <IoShareSocialOutline className="text-xl" />,
            },
            {
              _id: "14.2",
              title: "Manage Theme",
              route: "/panel/admin/site-settings/manage-theme",
              icon: <MdOutlineColorLens className="text-xl" />,
            },
            {
              _id: "14.3",
              title: "Website Settings",
              route: "/panel/admin/site-settings/website-settings",
              icon: <AiOutlineSetting className="text-xl" />,
            },
          ],
        },
        {
          _id: "15",
          title: "Manage Banner",
          path: "/panel/admin/manage-banner",
          icon: <BsCardImage className="text-xl" />,
          submenus: [
            {
              _id: "15.1",
              title: "Home Banner",
              route: "/panel/admin/manage-banner/home-banner",
              icon: <MdOutlineImage className="text-xl" />,
            },
            {
              _id: "15.2",
              title: "Seller Banner",
              route: "/panel/admin/manage-banner/seller-banner",
              icon: <RiImage2Line className="text-xl" />,
            },
          ],
        },
        {
          _id: "16",
          title: "Reports",
          route: `/panel/admin/reports`,
          icon: <HiOutlineClipboardDocumentList className="text-xl" />,
        },
        {
          _id: "17",
          title: "Notification",
          route: `/panel/admin/notifications`,
          icon: <AiOutlineBell className="text-xl" />,
        },

        // {
        //   _id: "18",
        //   title: "About Us Section",
        //   icon: <BiUserPin className="text-xl" />,
        //   submenus: [
        //     {
        //       _id: "18.1",
        //       title: "Banner Section",
        //       route: "/panel/admin/about-us/banner-section",
        //       icon: <MdOutlineAddPhotoAlternate className="text-xl" />,
        //     },
        //     {
        //       _id: "18.2",
        //       title: "Hero Section",
        //       route: "/panel/admin/about-us/hero-section",
        //       icon: <BsMenuApp className="text-xl" />,
        //     },
        //     {
        //       _id: "18.3",
        //       title: "Features Section",
        //       route: "/panel/admin/about-us/features-section",
        //       icon: <MdOutlineFeaturedPlayList className="text-xl" />,
        //     },
        //     {
        //       _id: "18.4",
        //       title: "Reviews Section",
        //       route: "/panel/admin/about-us/reviews-section",
        //       icon: <BsChatText className="text-xl" />,
        //     },
        //     {
        //       _id: "18.5",
        //       title: "Our Team",
        //       route: "/panel/admin/about-us/our-team",
        //       icon: <HiOutlineUserGroup className="text-xl" />,
        //     },
        //   ],
        // },
        {
          _id: "19",
          title: "Settings",
          icon: <BsGear className="text-xl" />,
          submenus: [
            {
              _id: "19.1",
              title: "Change Password",
              route: "/panel/admin/settings/change-password",
              icon: <BsKey className="text-xl" />,
            },
            // {
            //   _id: "19.2",
            //   title: "My Profile",
            //   route: "/panel/admin/settings/profile",
            //   icon: <BiUserCircle className="text-xl" />,
            // },
          ],
        },
      ];
    case "seller":
      return [
        {
          _id: "1",
          title: "Dashboard",
          route: `/panel/seller`,
          icon: <RxDashboard className="text-xl" />,
        },
        {
          _id: "2",
          title: "My Store",
          route: `/panel/seller/store`,
          icon: <RiTruckLine className="text-xl" />,
        },
        {
          _id: "3",
          title: "Product",
          path: `/panel/seller/products`,
          icon: <FiShoppingCart className="text-xl" />,
          submenus: [
            {
              _id: "3.1",
              title: "Add New Product",
              route: `/panel/seller/products/add-product`,
              icon: <IoAddOutline className="text-xl" />,
            },
            {
              _id: "3.2",
              title: "Manage Products",
              route: `/panel/seller/products/manage-products`,
              icon: <BiBox className="text-xl" />,
            },
          ],
        },
        {
          _id: "4",
          title: "Orders",
          path: `/panel/seller/orders`,
          icon: <HiOutlineShoppingBag className="text-xl" />,
          submenus: [
            {
              _id: "4.1",
              title: "Manage Orders",
              route: `/panel/seller/orders/manage-orders`,
              icon: <BiBox className="text-xl" />,
            },
          ],
        },
        {
          _id: "5",
          title: "Reports",
          route: `/panel/seller/reports`,
          icon: <HiOutlineClipboardDocumentList className="text-xl" />,
        },
        {
          _id: "6",
          title: "Notification",
          route: `/panel/seller/notifications`,
          icon: <AiOutlineBell className="text-xl" />,
        },
        {
          _id: "7",
          title: "Settings",
          icon: <BsGear className="text-xl" />,
          submenus: [
            {
              _id: "7.1",
              title: "Change Password",
              route: "/panel/admin/settings/change-password",
              icon: <BsKey className="text-xl" />,
            },
          ],
        },
      ];
  }
};
export default useMenuItems;
