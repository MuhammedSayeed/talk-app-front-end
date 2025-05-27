interface IProps {
    name: string;
}
const BlockMessage = ({ name }: IProps) => {
    return (
        <h1  className="text-4xl font-semibold text-center">{name} <br /> has blocked you </h1>

    )
}

export default BlockMessage