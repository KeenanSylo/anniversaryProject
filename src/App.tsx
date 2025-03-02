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
    date: "Nov 24, 2023",
    title: "Our First Date",
    image: "/date.jpeg",
  },
  {
    date: "Jan 4, 2024",
    title: "First Malmo Trip",
    image: "/malmo.jpeg",
  },
  {
    date: "April 28, 2024",
    title: "Trip to Ikea",
    image: "/ikea.jpeg",
  },
  {
    date: "July 30, 2024",
    title: "Inside out 2!",
    image: "/movie.jpeg",
  },
  {
    date: "Jan 17, 2025",
    title: "Copenhagen Adventure",
    image: "/fishes.jpeg",
  },
];

function App() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [page, setPage] = useState("home");
  const [count, setCount] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showOpenHeartButton, setShowOpenHeartButton] = useState(false); // State to control the visibility of the "Open the Heart" button
  const countTextRef = useRef<HTMLDivElement | null>(null);
  const [openedMemory, setOpenedMemory] = useState<number | null>(null);
  const [letterOpened, setLetterOpened] = useState(false); // State for opening the letter

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

  // Show the "Open the Heart" button after 5 seconds when on the "timeline" page
  useEffect(() => {
    if (page === "timeline") {
      const timeout = setTimeout(() => {
        setShowOpenHeartButton(true); // Make the "Open the Heart" button visible after 5 seconds
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [page]); // Only trigger when the page changes to "timeline"

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
            How long have we been officially together?
          </h1>
          <div className="text-2xl font-bold relative z-10" ref={countTextRef}>
            We have been officially together for{" "}
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
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 relative z-10 fadeInImage"
              onClick={() => setPage("timeline")}
            >
              Next Page
            </button>
          )}
        </>
      ) : page === "timeline" ? (
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

          {showOpenHeartButton && (
            <button
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-300 relative z-10"
              onClick={() => setPage("letter")}
            >
              Open the Heart
            </button>
          )}
        </>
      ) : page === "letter" ? (
        <>
          <h1 className="text-4xl font-bold mb-8 relative z-10">
            A Special Letter For my Baby 💌
          </h1>

          {/* Letter Content with Fade-in Animation */}
          <div
            className={`p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl relative overflow-hidden transition-all duration-700 ${
              letterOpened ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: 10 }} // Letter container has a higher z-index
          >
            <h2 className="text-2xl font-bold mb-4"> for my baby,</h2>
            {letterOpened ? (
              <p>
                Happy one year anniversary my baby. I hope you like this little
                project that I made for you. This past year has been the best
                and funnest year I have ever had. I like all the things we do
                together I love cooking with you, watching movies with you,
                going to new places with you and talking to you for hours and
                hours. Time fly by so fast when I am with you so I am happy I
                get to spend many more years with you. I like when you make me
                smile, when we laugh, when we joke around. When you're far away,
                just talking to you over the phone makes me feel at ease. I'm so
                excited we're going to Belgium together and all of my parents
                love you because I love you so much. I will always love you, and
                I will always make sure that you know that I love you. I will
                always be that one person that always be there for you and hear
                all the things you want to let out and say. In every universe
                that Im in, I will always find you and love you the same way I
                love you now. Be there for me okay. To many more years my cute
                baby. Aku sayang kamu so mach.
              </p>
            ) : null}
            <p className="mt-4">your baby, K ❤️</p>
          </div>

          {/* Heart Icon at the bottom */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-700"
            onClick={() => setLetterOpened(true)}
          >
            <i className="fa-solid fa-heart text-white text-4xl"></i>
          </div>
        </>
      ) : null}

      {/* Floating Hearts */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {hearts.map((heart) => (
          <i
            key={heart.id}
            className="fa-solid fa-heart text-red-500 absolute"
            style={{
              left: heart.left,
              top: heart.top,
              animation: `floatUp ${heart.duration} linear infinite`,
              zIndex: 0, // Hearts are behind the letter
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

          @keyframes moveHeart {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(0); }
          }

          .animate-heart {
            animation: moveHeart 1s ease-in-out forwards;
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
