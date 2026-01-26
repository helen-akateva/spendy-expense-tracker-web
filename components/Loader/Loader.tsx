import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
  fullScreen?: boolean;
}

export const Loader = ({ size = 80, fullScreen = false }: LoaderProps) => {
  return (
    <div className={fullScreen ? styles.fullScreen : styles.loader}>
      <Oval
        height={size}
        width={size}
        color="#0b6016"
        secondaryColor="#dfad3f"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
};
