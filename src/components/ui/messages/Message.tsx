

interface IProps{
    message : string;
}
const Message = ({message} : IProps) => {
  return (
    <p className="tracking-wider text-white/40 text-center">{message}</p>
  )
}

export default Message