import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      {page === "home" ? (
        <>
          <h1 className="text-4xl font-bold">Happy anniversary my baby! ❤️</h1>
          <img
            src="/IMG_4795.jpeg"
            alt="Anniversary"
            className="w-64 h-64 object-cover object-bottom rounded-lg shadow-lg"
          />
          <button
            className="bg-sky-300 px-3 py-2 rounded hover:bg-sky-400"
            onClick={() => setPage("next")}
          >
            Click Here to Continue!
          </button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Welcome to the Next Page!</h1>
          <button
            className="text-sky-500 underline"
            onClick={() => setPage("home")}
          >
            Go Back Home
          </button>
        </>
      )}
    </main>
  );
}

export default App;
