interface IProps {
    color: string;
    size: number; 
}

const Spinner = ({ color, size }: IProps) => {
    return (
        <div className="flex justify-center items-center w-fit h-fit">
            <div
                className="border-t-transparent rounded-full animate-spin"
                style={{
                    borderColor: color, // Set the color dynamically here
                    borderTopColor: "transparent",
                    width: `${size}px`,
                    height: `${size}px`,
                    borderWidth: `${size / 6}px`, // Adjust border size relative to spinner size
                }}
            ></div>
        </div>
    );
};

export default Spinner;