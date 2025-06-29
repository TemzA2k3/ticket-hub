interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "spinner" | "dots" | "pulse"
  text?: string
  fullScreen?: boolean
  className?: string
}

export const Loader = ({ size = "md", variant = "spinner", text, fullScreen = false, className = "" }: LoaderProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  const SpinnerLoader = () => (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="h-full w-full border-4 border-gray-200 border-t-black rounded-full"></div>
    </div>
  )

  const DotsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-5 h-5"} bg-black rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  )

  const PulseLoader = () => <div className={`${sizeClasses[size]} bg-black rounded-full animate-pulse`}></div>

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <DotsLoader />
      case "pulse":
        return <PulseLoader />
      default:
        return <SpinnerLoader />
    }
  }

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {renderLoader()}
      {text && <p className={`text-gray-600 font-medium ${textSizeClasses[size]}`}>{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}
