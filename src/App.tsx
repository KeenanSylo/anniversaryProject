import { useEffect, useState } from "react";

// Define the type for the heart object
type Heart = {
  id: number;
  left: string;
  top: string;
  duration: string;
};

function App() {
  const [hearts, setHearts] = useState<Heart[]>([]); // Explicitly define the state type
  const [page, setPage] = useState("home");

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now(); // Unique ID for each heart
      const newHeart: Heart = {
        id,
        left: Math.random() * 100 + "vw", // Random left position
        top: Math.random() * 100 + "vh", // Random top position
        duration: Math.random() * 3 + 2 + "s", // Random duration for float time
      };

      setHearts((prevHearts) => [...prevHearts, newHeart]);

      // Remove hearts after animation ends
      setTimeout(() => {
        setHearts((prevHearts) =>
          prevHearts.filter((heart) => heart.id !== id)
        );
      }, 5000); // Same as animation duration
    };

    const heartInterval = setInterval(createHeart, 100);

    return () => clearInterval(heartInterval); // Cleanup on unmount
  }, []);

  return (
    <main className="flex flex-col items-center gap-8 py-16 w-full h-screen bg-gradient-to-t from-pink-100 to-pink-300 overflow-hidden">
      {page === "home" ? (
        <>
          <h1 className="text-4xl font-bold relative z-10">
            Happy anniversary my baby ❤️
          </h1>
          <img
            src="/IMG_4795.jpeg"
            alt="Anniversary"
            className="w-64 h-64 object-cover object-bottom rounded-lg shadow-lg relative z-10"
          />
          <button
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-300 relative z-10"
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

      {/* Floating hearts container */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {hearts.map((heart) => (
          <i
            key={heart.id}
            className="fa-solid fa-heart text-red-500 absolute"
            style={{
              left: heart.left,
              top: heart.top,
              animation: `floatUp ${heart.duration} linear infinite`,
            }}
          ></i>
        ))}
      </div>

      <style>
        {`
      @keyframes floatUp {
        0% { 
          transform: translateY(0); 
          opacity: 1; 
        }
        100% { 
          transform: translateY(-100vh); /* Move heart completely off-screen */
          opacity: 0; 
        }
      }
      .fa-heart {
        font-size: 24px;
        position: absolute;
      }
    `}
      </style>
    </main>
  );
}

export default App;
