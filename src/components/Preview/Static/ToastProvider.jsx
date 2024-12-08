import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";
import notificationG from "../../../assets/svgs/notificationGreen.svg";
import notificationR from "../../../assets/svgs/notificationRed.svg";
import { X } from "lucide-react";

function closeBtn({ closeToast, type }) {
  return (
    <X
      size={18}
      onClick={closeToast}
      className={`alert-x ${type === "error" && "text-alert-t-error"}`}
    />
  );
}

export default function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={true}
      toastClassName={({ type }) =>
        "alert " +
        (type === "success"
          ? "alert-success"
          : type === "error" && "alert-error")
      }
      icon={({ type }) =>
        type === "success" ? (
          <img src={notificationG} />
        ) : (
          type === "error" && <img src={notificationR} />
        )
      }
      closeButton={closeBtn}
      style={{ position: "absolute", zIndex: 10, bottom: 88 }}
      transition={Flip}
    />
  );
}
