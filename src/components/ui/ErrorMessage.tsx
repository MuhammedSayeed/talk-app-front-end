

interface IProps{
    message : string;
    size? : "text-xs" | "text-sm" | "text-base" | "text-lg"
}
const ErrorMessage = ({message , size = "text-sm"} : IProps) => {
  return (
    <span className={`${size} text-red-700 block mt-2`}>{message}</span>
  )
}

export default ErrorMessage