

interface IProps{
    name: string;
}
const NameOfUser = ({name} :IProps) => {
  return (
    <h1 className="text-3xl text-white font-medium">{name}</h1>
  )
}

export default NameOfUser