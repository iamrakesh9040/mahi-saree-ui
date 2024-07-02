
export default function PageLoader() {
    return (
      <div className="relative flex w-full h-screen justify-center items-center">
        <div className="absolute animate-spin rounded-full h-44 w-44 border-t-4 border-b-4 border-green-400"></div>
        <img
          alt="loader Image"
          src="/loder.gif"
          className="rounded-full h-40 w-40"
        />
      </div>
    );
  }
  