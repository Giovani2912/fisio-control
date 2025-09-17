
interface ITitle {
    title?: string;
    createButton: React.ReactNode
}

const Title = ({ title, createButton }: ITitle) => {
    return (
        <>
            {createButton ? (
                <div className="flex items-center justify-between mt-8 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {createButton}
                </div >
            ) : (
                <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4">
                    {title}
                </h1>
            )}
        </>
    );
};

export default Title;
