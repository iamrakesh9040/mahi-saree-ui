import { MouseEvent, useEffect, useRef } from "react";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomModal = ({ open, onClose, children }: Props) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e: any) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
      className="rounded-lg"
    >
      {children}
    </dialog>
  );
};

export default CustomModal;
