import { useEffect, useState, useRef } from "react";

// Define the type for the heart object
type Heart = {
  id: number;
  left: string;
  top: string;
  duration: string;
};

type Memory = {
  date: string;
  title: string;
  image: string;
};

const memories: Memory[] = [
  {
    date: "Jan 14, 2023",
    title: "Our First Date 💕",
    image: "/malmo.jpeg",
  },
  {
    date: "Feb 14, 2023",
    title: "First Valentine's Day ❤️",
    image: "/movie.jpeg",
  },
  {
    date: "May 20, 2023",
    title: "Trip to the Beach 🏖️",
    image: "/ikea.jpeg",
  },
  {
    date: "Sept 10, 2023",
    title: "Our Anniversary 🎉",
    image: "/fishes.jpeg",
  },
  {
    date: "Dec 25, 2023",
    title: "Christmas Together 🎄",
    image: "/el4.jpeg",
  },
];

function App() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [page, setPage] = useState("home");
  const [count, setCount] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const countTextRef = useRef<HTMLDivElement | null>(null);
  const [openedMemory, setOpenedMemory] = useState<number | null>(null);

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now();
      const newHeart: Heart = {
        id,
        left: Math.random() * 100 + "vw",
        top: Math.random() * 100 + "vh",
        duration: Math.random() * 3 + 2 + "s",
      };

      setHearts((prevHearts) => [...prevHearts, newHeart]);

      setTimeout(() => {
        setHearts((prevHearts) =>
          prevHearts.filter((heart) => heart.id !== id)
        );
      }, 5000);
    };

    const heartInterval = setInterval(createHeart, 100);
    return () => clearInterval(heartInterval);
  }, []);

  useEffect(() => {
    let counter = 0;
    const countInterval = setInterval(() => {
      if (counter < 365) {
        setCount((prevCount) => prevCount + 1);
        counter++;
      } else {
        clearInterval(countInterval);
        setShowImages(true);
      }
    }, 20);

    return () => clearInterval(countInterval);
  }, []);

  useEffect(() => {
    if (showImages && currentImageIndex < 4) {
      const imageTimeout = setTimeout(() => {
        setCurrentImageIndex(currentImageIndex + 1);
      }, 2000);
      return () => clearTimeout(imageTimeout);
    }

    if (currentImageIndex === 4) {
      setTimeout(() => {
        setShowNextButton(true);
      }, 2000);
    }
  }, [currentImageIndex, showImages]);

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
      ) : page === "next" ? (
        <>
          <h1 className="text-4xl font-bold mb-4 relative z-10">
            Welcome to the Next Page!
          </h1>
          <div className="text-2xl font-bold relative z-10" ref={countTextRef}>
            We have been together for{" "}
            <span className="text-red-500">{count}</span> days!
          </div>

          {showImages && (
            <div className="flex gap-8 mt-8 relative z-10">
              {currentImageIndex >= 1 && (
                <img
                  src="/el1.jpeg"
                  alt="El1"
                  className="w-64 h-64 object-cover object-center rounded-lg shadow-lg fadeInImage"
                />
              )}
              {currentImageIndex >= 2 && (
                <img
                  src="/el4.jpeg"
                  alt="El4"
                  className="w-64 h-64 object-cover object-center rounded-lg shadow-lg fadeInImage"
                />
              )}
              {currentImageIndex >= 3 && (
                <img
                  src="/el2.jpeg"
                  alt="El2"
                  className="w-64 h-64 object-cover object-center rounded-lg shadow-lg fadeInImage"
                />
              )}
              {currentImageIndex >= 4 && (
                <img
                  src="/el3.jpeg"
                  alt="El3"
                  className="w-64 h-64 object-cover object-center rounded-lg shadow-lg fadeInImage"
                />
              )}
            </div>
          )}

          {showNextButton && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 relative z-10 fadeInImage"
              onClick={() => setPage("timeline")}
            >
              Next Page
            </button>
          )}
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8 relative z-10">
            Some of our memories 😊
          </h1>

          {/* Memory boxes */}
          <div className="flex flex-row items-top gap-8 relative z-10 overflow-x-auto">
            {memories.map((memory, index) => (
              <div key={index} className="relative flex flex-col items-center">
                {/* Clickable Box */}
                <div
                  className="w-64 p-4 bg-white rounded-lg shadow-lg cursor-pointer text-center"
                  onClick={() =>
                    setOpenedMemory(openedMemory === index ? null : index)
                  }
                >
                  <h2 className="text-lg font-bold">{memory.title}</h2>
                  <span className="text-sm font-semibold mt-2">
                    {memory.date}
                  </span>
                </div>

                {/* Dropdown Style Image */}
                {openedMemory === index && (
                  <div className="mt-4 w-64 bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-64 h-64 object-contain rounded-md shadow-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

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
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
          .fa-heart { font-size: 24px; position: absolute; }
          @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
          .fadeInImage { animation: fadeIn 2s ease-in forwards; }
        `}
      </style>
    </main>
  );
}

export default App;
