interface ITitle {
  title?: string;
  createButton?: React.ReactNode;
}

const Title = ({ title, createButton }: ITitle) => {
  return (
    <>
      {createButton ? (
        <div className="mt-8 mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {createButton}
        </div>
      ) : (
        <h1 className="mt-8 mb-4 text-2xl font-bold text-gray-800">{title}</h1>
      )}
    </>
  );
};

export default Title;
