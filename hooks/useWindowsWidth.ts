import { useLayoutEffect, useState } from "react";

export default function useWindowWidth() {
  const [windowSizeWidth, setWindowSizeWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSizeWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSizeWidth;
}
