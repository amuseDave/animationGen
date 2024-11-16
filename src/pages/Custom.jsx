// import { useSearchParams } from "react-router-dom";
import MainPreview from "../component/MainPreview/MainPreview";
import Controller from "../component/Controller/Controller";

export default function Custom() {
  // const params = useSearchParams();

  return (
    <>
      <MainPreview type="custom" />
      <Controller type="custom" />
    </>
  );
}
