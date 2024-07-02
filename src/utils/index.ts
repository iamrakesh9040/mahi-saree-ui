// import { Options } from "@material-table/core";
// import { ExportCsv, ExportPdf } from "@material-table/exporters";

import { Options } from "@material-table/core";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://terracotta.onrender.com/api/v1";

//? SET To LocalStorage
export const saveToLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};
export const setLocalStorageItem = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
//? GET From LocalStorage
export const getFromLocalStorage = (key: string) => {
  return typeof window !== "undefined"
    ? localStorage.getItem(key) ?? null
    : null;
};
export const getLocalStorageItem = (key: string): any | null => {
  if (typeof window !== 'undefined') {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      return JSON.parse(storedItem);
    }
  }
  return null;
};
//? Remove from LocalStorage
export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

//? get discount
export const getDiscountValue = (MRP: number, salePrice: number) =>
  (((MRP - salePrice) / MRP) * 100).toFixed(0);

//? currency formatter
export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat("ar-AE", {
    style: "currency",
    currency: "AED",
  }).format(value);
};

//color code for colorCard
export const sweetAlertStyles = {
  container: "...",
  popup: "swal-container",
  title: "swal-title",
  closeButton: "...",
  icon: "...",
  image: "...",
  htmlContainer: "...",
  input: "...",
  inputLabel: "...",
  validationMessage: "...",
  actions: "...",
  confirmButton: `swal-confirm-button`,
  denyButton: "...",
  cancelButton: `swal-cancel-button`,
  loader: "...",
  footer: "...",
  timerProgressBar: "...",
};

export const sweetAlertCustomStyles =
  "rgba(76, 78, 100, 0.2) 0px 6px 6px -3px, rgba(76, 78, 100, 0.14) 0px 10px 14px 1px, rgba(76, 78, 100, 0.12) 0px 4px 18px 3px;";


export const MuiTblOptions = (downloadTitle?: string) => {
  const options: Options<any> = {
    headerStyle: {
      whiteSpace: "nowrap",
      backgroundColor: "#696cff",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "0.9rem",
      fontFamily: "inherit",
      border: "none",
    },
    rowStyle: {
      color: "#000",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    actionsColumnIndex: -1,
    addRowPosition: "first",
    pageSize: 8,
    detailPanelColumnAlignment: "right",
    exportAllData: false,
    headerSelectionProps: { color: "secondary" },
    selectionProps: () => ({ color: "secondary" }),
    hideFilterIcons: true,
  };

  return options;
};

// export const MuiTblOptionsWithDownload = (downloadFileName?: string) => {
//   const options: Options<any> = {
//     actionsColumnIndex: -1,
//     addRowPosition: "first",
//     pageSize: 8,
//     detailPanelColumnAlignment: "right",
//     exportAllData: true,
//     headerSelectionProps: { color: "secondary" },
//     selectionProps: () => ({
//       color: "secondary",
//     }),
//     exportMenu: [
//       {
//         label: "Export All Data In CSV",
//         exportFunc: (cols: any, data: any) =>
//           ExportCsv(cols, data, downloadFileName || "AllData"),
//       },
//       {
//         label: "Export All Data In PDF",
//         exportFunc: (cols: any, data: any) =>
//           ExportPdf(cols, data, downloadFileName || "AllData"),
//       },
//     ],
//   };
//   return options;
// };
