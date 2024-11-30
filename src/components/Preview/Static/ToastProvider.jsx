import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";
import { X, Bell } from "lucide-react";

function closeBtn({ closeToast, type }) {
  return (
    <X
      size={18}
      onClick={closeToast}
      className={`ml-4 select-none transition-all ${
        type === "success" ? "text-alert-t-success" : "text-alert-t-error"
      } active:scale-[1.4] hover:scale-[1.2]`}
    />
  );
}

export default function ToastProvider() {
  function renderIcon({ type }) {
    return (
      <Bell
        size={24}
        className={`${
          type === "success" ? "text-alert-t-success" : "text-alert-t-error"
        }`}
      />
    );
  }

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
      toastClassName={({ type, ...rest }) => {
        console.log(rest);

        return (
          "alert " +
          (type === "success"
            ? "success"
            : type === "error"
            ? "error"
            : type === "info"
            ? "bg-blue-500 text-white"
            : type === "warning"
            ? "bg-yellow-500 text-black"
            : "")
        );
      }}
      icon={renderIcon}
      closeButton={closeBtn}
      style={{ position: "absolute" }}
      transition={Flip}
    />
  );
}
