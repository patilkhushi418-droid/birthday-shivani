import { useEffect, useRef, useState } from "react";
import "./App.css";

const BASE = import.meta.env.BASE_URL;

const fancyImages = Array.from(
  { length: 11 },
  (_, i) => `${BASE}images/fancy${i + 1}.jpeg`
);

const treasureImages = Array.from(
  { length: 9 },
  (_, i) =>
    `${BASE}images/treasure${i + 1}.jpeg`
);

const fancyMessages = [
  "Okayyy miss pretty navratri fit👀🎀",
  "This one is actually too cute.",
  "Just casually looking this good ✨",
  "South Indian Moment.",
  "phirse navratri ",
  "This picture >>> everything.",
  "Pretty girl energy 💗",
  "Fancy Shivani didi.",
  "kisko dhundh rhe ho.",
  "Just you being you ♡ ",
  "Keeping this memory forever.~hostelcore",
];

const treasureMessages = [
  "WHY ARE YOU LOOKING LIKE THIS 😭",
  "my best capture hehe.",
  "The mandir outing with u , apko bahar nikalna mushkil h.",
  "Peak Shivani behaviour.",
  "The evidence speaks for itself ~~cutness overloaded",
  "Sanyas le liye ? 😭",
  "This is going straight into the memory vault #First bday",
  "Didi ke fitchecks .",
  "And this is exactly why I love our memories. Great time spent together",
];

function App() {
  const [page, setPage] = useState(1);
  const [section, setSection] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef(null);

  const openSection = (name) => {
    setSection(name);
    setCurrentIndex(0);
    setPage(4);
  };

  const goBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSection("");
    setCurrentIndex(0);
    setPage(3);
  };

  const nextMedia = () => {
    const total =
      section === "fancy"
        ? fancyImages.length
        : treasureImages.length;

    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPage(6);
    }
  };

  const previousMedia = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (
      page === 4 &&
      section !== "di" &&
      audioRef.current
    ) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch(() => {
        console.log("Music requires user interaction.");
      });
    }
  }, [page, section]);

  const getSong = () => {
    if (section === "fancy") {
      return `${BASE}music/fancy.mp3`;
    }

    if (section === "treasure") {
      return `${BASE}music/treasure.mp3`;
    }

    return "";
  };

  return (
    <div className="app">

      {/* PAGE 1 */}
      {page === 1 && (
        <section className="page page-one">

          <div className="floating-star star-one">✦</div>
          <div className="floating-star star-two">♡</div>
          <div className="floating-star star-three">✦</div>

          <div className="opening-content">

            <p className="small-text">
              a little something for you ♡
            </p>

            <h1>
              Happy Birthday
              <span>Shivani Didi</span>
            </h1>

            <div className="heart">♡</div>

            <button
              className="main-button"
              onClick={() => setPage(2)}
            >
              Open Your Surprise
              <span>→</span>
            </button>

          </div>

          <p className="bottom-text">
            made with lots of love & a little bit of chaos
          </p>

        </section>
      )}

      {/* PAGE 2 */}
      {page === 2 && (
        <section className="page message-page">

          <div className="message-card">

            <p className="message-small">
              Dear Shivani Didi,
            </p>

            <h2>
              Happy Birthday
              <br />
              to you ♡
            </h2>

            <p>
              Living with you has given me so many random, funny and
              genuinely beautiful memories.
            </p>

            <p>
              From our everyday room-life moments to all the stupid little
              things that somehow become the memories we remember the most,
              I’m really glad I got to share them with you.
            </p>

            <p>
              You’re not just my roommate anymore. You’ve genuinely become
              someone I can count on and someone who makes this whole
              room feel a little more like home.
            </p>

            <p className="special-line">
              Some pretty memories, some unforgettable ones,
              and obviously... some very <b>you</b> moments. 😭
            </p>

            <p className="ending">
              Happy Birthday once again, Didi. ♡
            </p>

            <button
              className="main-button"
              onClick={() => setPage(3)}
            >
              There's more...
              <span>→</span>
            </button>

          </div>

        </section>
      )}

      {/* PAGE 3 */}
      {page === 3 && (
        <section className="page choices-page">

          <p className="choice-small">
            okay didi...
          </p>

          <h2 className="choice-title">
            Pick your
            <br />
            little surprise ♡
          </h2>

          <p className="choice-subtitle">
            three tiny collections of you
          </p>

          <div className="choice-container">

            <div className="choice-card fancy-card">

              <span className="card-number">
                01
              </span>

              <div className="card-icon">
                ♡
              </div>

              <h3>
                FANCY
              </h3>

              <p>
                all the pretty
                <br />
                little moments
              </p>

              <button
                onClick={() => openSection("fancy")}
              >
                open me →
              </button>

            </div>

            <div className="choice-card treasure-card">

              <span className="card-number">
                02
              </span>

              <div className="card-icon">
                ✦
              </div>

              <h3>
                TRESURE
              </h3>

              <p>
                the pictures
                <br />
                we probably shouldn't show
              </p>

              <button
                onClick={() => openSection("treasure")}
              >
                open me →
              </button>

            </div>

            <div className="choice-card di-card">

              <span className="card-number">
                03
              </span>

              <div className="card-icon">
                ♪
              </div>

              <h3>
                DI
              </h3>

              <p>
                one little
                <br />
                surprise
              </p>

              <button
                onClick={() => openSection("di")}
              >
                open me →
              </button>

            </div>

          </div>

        </section>
      )}

      {/* PHOTO PAGE */}
      {page === 4 && section !== "di" && (
        <section className="page media-page">

          <audio
            ref={audioRef}
            src={getSong()}
            loop
          />

          <button
            className="back-button"
            onClick={goBack}
          >
            ← choices
          </button>

          <div className="media-header">

            <p>
              {section === "fancy" ? "01" : "02"}
            </p>

            <h2>
              {section === "fancy"
                ? "FANCY"
                : "TRESURE"}
            </h2>

            <span>
              {currentIndex + 1} /{" "}
              {section === "fancy"
                ? fancyImages.length
                : treasureImages.length}
            </span>

          </div>

          <div className="photo-memory">

            <div className="photo-frame">

              <img
                src={
                  section === "fancy"
                    ? fancyImages[currentIndex]
                    : treasureImages[currentIndex]
                }
                alt="birthday memory"
              />

            </div>

            <div className="photo-caption">

              <span>♡</span>

              <p>
                {section === "fancy"
                  ? fancyMessages[currentIndex]
                  : treasureMessages[currentIndex]}
              </p>

            </div>

          </div>

          <div className="media-controls">

            <button
              className="arrow-button"
              onClick={previousMedia}
              disabled={currentIndex === 0}
            >
              ←
            </button>

            <button
              className="next-button"
              onClick={nextMedia}
            >
              {currentIndex ===
              (section === "fancy"
                ? fancyImages.length
                : treasureImages.length) - 1
                ? "see all the memories ♡"
                : "next memory →"}
            </button>

          </div>

        </section>
      )}

      {/* DI VIDEO */}
      {page === 4 && section === "di" && (
        <section className="page media-page">

          <button
            className="back-button"
            onClick={goBack}
          >
            ← choices
          </button>

          <div className="media-header">

            <p>03</p>

            <h2>DI</h2>

            <span>
              just one for you ♡
            </span>

          </div>

          <div className="video-memory">

            <video
              controls
              playsInline
              preload="auto"
              src={`${BASE}video/di1.mp4`}
              style={{
                width: "90%",
                maxWidth: "500px",
                display: "block",
                margin: "20px auto"
              }}
            />

            <div className="video-caption">

              <span>♪</span>

              <p>
                because obviously... I had to put this here 😭
              </p>

            </div>

          </div>

          <button
            className="next-button finish-button"
            onClick={() => setPage(6)}
          >
            finish with this ♡
          </button>

        </section>
      )}

      {/* COLLAGE */}
      {page === 6 && (
        <section className="page collage-page">

          <button
            className="back-button"
            onClick={() => setPage(3)}
          >
            ← choices
          </button>

          <div className="collage-header">

            <p>
              a little box of memories
            </p>

            <h2>
              {section === "fancy"
                ? "FANCY ♡"
                : section === "treasure"
                ? "TRESURE ♡"
                : "DI ♡"}
            </h2>

          </div>

          {section === "fancy" && (
            <div className="scrapbook">

              {fancyImages.map((image, index) => (
                <div
                  className={`scrap-photo scrap-photo-${index + 1}`}
                  key={image}
                >

                  <img
                    src={image}
                    alt={`memory ${index + 1}`}
                  />

                </div>
              ))}

            </div>
          )}

          {section === "treasure" && (
            <div className="scrapbook">

              {treasureImages.map((image, index) => (
                <div
                  className={`scrap-photo scrap-photo-${index + 1}`}
                  key={image}
                >

                  <img
                    src={image}
                    alt={`memory ${index + 1}`}
                  />

                </div>
              ))}

            </div>
          )}

          {section === "di" && (
            <div className="video-collage">

              <div className="video-frame">

                <video
                  controls
                  playsInline
                  preload="auto"
                  src={`${BASE}video/di1.mp4`}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto"
                  }}
                />

              </div>

            </div>
          )}

          <div className="final-message">

            <p>
              and that's just a tiny piece of all the memories ♡
            </p>

            <h3>
              Happy Birthday, Didi 🎀
            </h3>

          </div>

        </section>
      )}

    </div>
  );
}

export default App;