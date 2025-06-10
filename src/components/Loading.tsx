import { useTheme } from "next-themes";
import { SyncLoader } from "react-spinners";

export function Loading() {
  const { theme } = useTheme()

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SyncLoader
        color={theme === "dark" ? "#fff" : "#0e121b"}
        loading={true}
        cssOverride={{}}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}