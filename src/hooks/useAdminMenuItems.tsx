import { AiOutlineBell, AiOutlineSound } from "react-icons/ai";
import { BiBox, BiLayer, BiSupport, BiUserCircle } from "react-icons/bi";
import {
  BsBox,
  BsBoxes,
  BsCardImage,
  BsChatSquareText,
  BsGear,
  BsGearWideConnected,
  BsKey,
} from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineQuestionMarkCircle,
  HiOutlineShoppingBag,
  HiOutlineUsers,
} from "react-icons/hi2";
import {
  IoAddOutline,
  IoColorPaletteOutline,
  IoListSharp,
} from "react-icons/io5";
import { MdOutlineMobileFriendly, MdOutlinePrivacyTip } from "react-icons/md";
import { PiCoins } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";

const useAdminMenuItem = () => [
  {
    _id: "1",
    title: "Dashboard",
    route: "/admin",
    icon: <RxDashboard className="text-xl" />,
  },
  {
    _id: "2",
    title: "Customers",
    route: "/admin/users",
    icon: <HiOutlineUsers className="text-xl" />,
  },
  {
    _id: "3",
    title: "Category",
    route: "/admin/category",
    icon: <BiLayer className="text-xl" />,
  },
  {
    _id: "4",
    title: "Manage Color",
    route: "/admin/color",
    icon: <IoColorPaletteOutline className="text-xl" />,
  },
  {
    _id: "5",
    title: "Product",
    icon: <FiShoppingCart className="text-xl" />,
    submenus: [
      {
        _id: "5.1",
        title: "Product List",
        route: "/admin/products/manage-product",
        icon: <IoListSharp className="text-xl" />,
      },
      {
        _id: "5.1",
        title: "Create Product",
        route: "/admin/products/add-product",
        icon: <IoAddOutline className="text-xl" />,
      },
      // {
      //   _id: "5.2",
      //   title: "Product Review",
      //   route: "/admin/products/review-product",
      //   icon: <BiBox className="text-xl" />,
      // },
    ],
  },
  {
    _id: "6",
    title: "Orders",
    icon: <HiOutlineShoppingBag className="text-xl" />,
    submenus: [
      {
        _id: "6.1",
        title: "All Order",
        route: "/admin/orders",
        icon: <BsBox className="text-xl" />,
      },
      {
        _id: "6.2",
        title: "Cancelled Order",
        route: "/admin/orders/cancelled",
        icon: <BsBoxes className="text-xl" />,
      },
      {
        _id: "6.2",
        title: "Return Order",
        route: "/admin/orders/return",
        icon: <BsBoxes className="text-xl" />,
      },
    ],
  },
  // {
  //   _id: "8",
  //   title: "Reports",
  //   route: "/admin/reports",
  //   icon: <HiOutlineClipboardDocumentList className="text-xl" />,
  // },
  {
    _id: "8",
    title: "Revenue",
    route: "/admin/revenue",
    icon: <HiOutlineClipboardDocumentList className="text-xl" />,
  },
  // {
  //   _id: "9",
  //   title: "Reviews",
  //   route: "/admin/reviews",
  //   icon: <BsChatSquareText className="text-xl" />,
  // },

  {
    _id: "10",
    title: "Support",
    icon: <BiSupport className="text-xl" />,
    route: "/admin/support",
  },
  {
    _id: "11",
    title: "Contact",
    route: "/admin/contact",
    icon: <BsChatSquareText className="text-xl" />,
  },
  {
    _id: "12",
    title: "Config",
    icon: <MdOutlineMobileFriendly className="text-xl" />,
    submenus: [
      {
        _id: "12.4",
        title: "Coupons",
        route: "/admin/config/coupons",
        icon: <PiCoins className="text-xl" />,
      },
      {
        _id: "12.6",
        title: "Privacy Policy ",
        route: "/admin/config/privacy-policy",
        icon: <MdOutlinePrivacyTip className="text-xl" />,
      },
      {
        _id: "12.7",
        title: "Manage FAQ ",
        route: "/admin/manage/manage-faq",
        icon: <HiOutlineQuestionMarkCircle className="text-xl" />,
      },
      {
        _id: "11.5",
        title: "Manage Site",
        route: "/admin/manage-site",
        icon: <BsGear className="text-xl" />,
      },
      {
        _id: "11.5",
        title: "Manage Advertisement",
        route: "/admin/config/manage-advertisement",
        icon: <AiOutlineSound className="text-xl" />,
      },
    ],
  },
  // {
  //   _id: "13",
  //   title: "Manage Offer",
  //   route: "/admin/manage-offer",
  //   icon: <MdOutlineLocalOffer className="text-xl" />,
  // },
  {
    _id: "14",
    title: "Notification",
    route: "/admin/notifications",
    icon: <AiOutlineBell className="text-xl" />,
  },
  {
    _id: "15",
    title: "Testimonial",
    route: "/admin/testimonial",
    icon: <BsGearWideConnected className="text-xl" />,
  },
  {
    _id: "16",
    title: "Banner",
    icon: <BsCardImage className="text-xl" />,
    route: "/admin/banner",
  },

  // {
  //   _id: "17",
  //   title: "About Us Section",
  //   icon: <BiUserPin className="text-xl" />,
  //   submenus: [
  //     {
  //       _id: "17.1",
  //       title: "Banner Section",
  //       route: "/admin/about-us/banner-section",
  //       icon: <MdOutlineAddPhotoAlternate className="text-xl" />,
  //     },
  //     {
  //       _id: "17.2",
  //       title: "Hero Section",
  //       route: "/admin/about-us/hero-section",
  //       icon: <BsMenuApp className="text-xl" />,
  //     },
  //     {
  //       _id: "17.3",
  //       title: "Features Section",
  //       route: "/admin/about-us/features-section",
  //       icon: <MdOutlineFeaturedPlayList className="text-xl" />,
  //     },
  //     {
  //       _id: "17.4",
  //       title: "Reviews Section",
  //       route: "/admin/about-us/reviews-section",
  //       icon: <BsChatText className="text-xl" />,
  //     },
  //     {
  //       _id: "17.5",
  //       title: "Our Team",
  //       route: "/admin/about-us/our-team",
  //       icon: <HiOutlineUserGroup className="text-xl" />,
  //     },
  //   ],
  // },
  {
    _id: "18",
    title: "Settings",
    icon: <BsGear className="text-xl" />,
    submenus: [
      {
        _id: "18.1",
        title: "Change Password",
        route: "/admin/settings/change-password",
        icon: <BsKey className="text-xl" />,
      },
      {
        _id: "18.2",
        title: "My Profile",
        route: "/admin/settings/profile",
        icon: <BiUserCircle className="text-xl" />,
      },
    ],
  },
];

export default useAdminMenuItem;
