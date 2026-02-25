import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//import FAQ from "./assets/components/faq";
import Readmore from "./assets/components/Readmore";
import Clock from "./pages/clock";
import api from "./utils/api";
import LiveGameResult from "./pages/LiveGameResult";
import GroupTable from "./pages/GroupTable";
import MonthlyGroupTable from "./pages/MonthlyGroupTable";
import CustomAds from "./pages/CustomAds";
import BottomAds from "./pages/BottomPromotion";

import Luckynumber from "./assets/components/Luckynumber";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
	  const currentYear = new Date().getFullYear();
  const startYear = 2025;

  // Fetch games from backend
  useEffect(() => {
    let cancelled = false;
    const fetchGames = async () => {
      try {
        const res = await api.get("/games");
        if (cancelled) return;
        setGames(res.data);
        console.log("Fetched games:", res.data);
        if (res.data.length > 0) setSelectedGame(res.data[0].name);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchGames();
    return () => {
      cancelled = true;
    };
  }, []);
const handleCheck = () => {
  if (!selectedGame || !selectedYear) return;

  const gameSlug = selectedGame
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

navigate(`/chart-${selectedYear}/${gameSlug}-satta-king-result`);
};

const UpcomingResults = ({ loadingInitial }) => {
  const [cards, setCards] = useState(
    new Array(3).fill(null).map(() => ({
      name: "",
      resultTime: "--",
      latestResult: null,
      minutesUntil: null,
      loading: true
    }))
  );

  const mountedRef = useRef(false);
  const intervalRef = useRef(null);
  const controllerRef = useRef(null);

  // Convert "18:30" -> "6:30 PM"
  const to12Hour = (timeStr) => {
    if (!timeStr || timeStr === "--") return "--";
    const [h, m] = timeStr.split(":");
    let hour = parseInt(h, 10);
    const minutes = parseInt(m, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const fetchOnce = async () => {
    try {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      const r = await api.get("/upcoming?limit=5", {
        signal: controllerRef.current.signal
      });

      const data = r.data;
      if (!mountedRef.current) return;

      if (Array.isArray(data.cards)) {
        const mapped = data.cards.map((c) => ({
          name: c.name || "—",
          resultTime: c.resultTime ? to12Hour(c.resultTime) : "--",
          latestResult: c.latestResult ?? null,
          minutesUntil: c.minutesUntil ?? null,
          loading: false
        }));

        while (mapped.length < 3)
          mapped.push({
            name: "--",
            resultTime: "--",
            latestResult: null,
            minutesUntil: null,
            loading: false
          });

        setCards(mapped.slice(0, 3));
      } else {
        setCards(
          new Array(3).fill(null).map(() => ({
            name: "--",
            resultTime: "--",
            latestResult: null,
            minutesUntil: null,
            loading: false
          }))
        );
      }
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.warn("Upcoming fetch failed", err);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchOnce();
    intervalRef.current = setInterval(fetchOnce, 30000);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const Card = ({ card }) => {
    const showWaiting = !card.latestResult;

    return (
      <section className="circlebox2">
        <div>
          <div className="sattaname">
            <p style={{ margin: 0 }}>{card.name}</p>
          </div>

          <div className="sattaresult">
            <p style={{ margin: 0, padding: 0 }}>
              <span style={{ letterSpacing: 4 }}>
                {card.loading ? (
                  "--"
                ) : showWaiting ? (
                  <img
                    src="images/d.gif"
                    alt="wait icon"
                    height={50}
                    width={50}
                  />
                ) : (
                  card.latestResult
                )}
              </span>
            </p>

            <p
              style={{
                margin: 0,
                fontSize: 14,
                marginTop: 5,
                fontWeight: "bold"
              }}
            >
              <small style={{ color: "white" }}>{card.resultTime}</small>
            </p>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <Card card={cards[2]} />
      <Card card={cards[0]} />
      <Card card={cards[1]} />
    </div>
  );
};







  return (
    <div>
      <section className="circlebox">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="liveresult">
                <div id="clockbox">
                  <Clock />
                </div>
                <p className="hintext" style={{ padding: 0 }}>
                  हा भाई यही आती हे सबसे पहले खबर रूको और देखो
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- REPLACED GALI BLOCK ---------- */}
      <UpcomingResults games={games} loading={loading} />
      {/* ---------- end replaced block ---------- */}

      <LiveGameResult
        gameName="disawar"
        imgArrow="images/arrow.gif"
        imgWait="images/d.gif"
      />

      <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }} className="lucky-number-section"
      >
        <div className="rows">
          <div
            className="card-body notification munda"
            style={{
              display: "block",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <div><h2><b>आज की पकड़ जोड़ी</b></h2></div>
				<Luckynumber />		
            
            
          </div>
        </div>
      </div>
      
      <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}
      >
        <div className="rows">
          <div
            className="card-body notification munda "
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            <h2><b>मुंडा 01 से 100 नम्बरो तक की राशि/फैमिली</b></h2>
            <Link className="btnlink header_btn blck" to="/01-100-ki-family">
                    Check <span class="arw">→</span>
                </Link>
            
            
          </div>
        </div>
      </div>
      <CustomAds />

      <GroupTable groupName="gr1" />
      <GroupTable groupName="gr2" />

      <BottomAds />
  

      
		{/*<div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}

        className="card-body notification munda blv-section"
      >
        <div className="rows" style={{width: "100%",}}>
          <div
            className="card-body notification"
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <h2>
              जिस व्यक्ति को तेज़ और विश्वसनीय परिणाम चाहिए, वे हमारे{" "}
              <Link to="https://whatsapp.com/channel/0029Vb6z44e17Ems4yyjTj0y">
                <strong> WhatsApp</strong>
              </Link>{" "} चैनल से जुड़ सकते हैं।
            </h2>
          </div>
        </div>
      </div>*/}

      
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>SATTA RECORD CHART {new Date().getFullYear()}</h5>
            </div>
          </div>
        </div>
      </section>

      <div className="Select_selectMainDiv__QD2cf">
        <select
          aria-label="satta game name"
          className="Select_selectTag__IzyVd"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          {games.map((game) => (
            <option key={game._id} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
        <select
          aria-label="year"
          className="Select_selectTag__IzyVd Select_secondTag__Q9uV_"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {Array.from(
            { length: currentYear - startYear + 1 },
            (_, i) => startYear + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button className="header_btn" type="button" onClick={handleCheck}>
          Check <span className="arw">→</span>
        </button>
      </div>
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>
                <b>
                  SATTA RESULT CHART{" "}
                  {new Date()
                    .toLocaleString("en-US", { month: "long" })
                    .toUpperCase()}{" "}
                  {new Date().getFullYear()}
                </b>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <MonthlyGroupTable groupName="gr1" />
      <MonthlyGroupTable groupName="gr2" />
     
		<section className="game-detail">
        <div className="containers">
          <div className="rowr">
            <div className="col-left">
              <div className="text-left2">
                <h1>
                  Discover Satta King: India’s Epic Number Game and Its Striking Festering
                </h1>
              </div>
            </div>
            <div className="col-right">
              <div className="content">
                <p>SATTA KING is the most visited SATTA site by B7 Satta! With this guide, you will learn all about the Satta King game; its history, gameplay, and top markets — as well as why players should play diligently. All set to explore? Let's have a look at it.</p>
                
<h2>Satta King: What is it?</h2>

<p>Satta King is not even a game, it is more of a numbers game that is based on the practice of betting. In this game, people bet on the 2 to 4 last digits of a randomly drawn number. “Satta” means betting or gambling, and “King” refers to whoever successfully bets on the winning number.</p>


                <Readmore>
                  <p>The best part about this game is that you can start with a small amount like ₹10 or ₹50. These days, many people play through apps or agents. If the number that you picked is matched, you could win many multiples of your original bet.</p>

<p>But it's ALL luck. Losing and gaining both have their share of luck in the outcomes, which is why it is always wise to spend money wisely and responsibly.</p>

<h2>Satta King's Historical Background</h2>

<p>The gambling practice that is also called "satta matka" began in the 1950s & was developed after India attained itself. Originally, it was called "ankada jugar" or figures gambling. This involved betting on the cotton opening and closing prices as announced by the New York Cotton Exchange, which he got from the Bombay Cotton Exchange through teleprinters.</p>

<p>From 1950 until 1960, this system remained in place. However, the New York Cotton Exchange had "abolished" these rates by 1961. In order to find an alternative, they began searching.</p>

<p>A jar or pitcher (matka) and slips of paper (parchis) were then used to draw the numbers, modernising the custom. This became well-known and was dubbed "satta king." Results began to be updated every day.</p>

<p>Since India was an underground country, players would look for a local khaiwal (bookie) in each city or town who would collect the slips and write the results on cement poles.</p>

<p>Satta lottery is still illegal in the majority of India.</p>

<p>Although the game is extensively played and the word "Satta" is quite well-known in India, it is prohibited by Indian law.</p>

<h2>How to Play Satta King: A Comprehensive Step by Step Guide</h2>

<h3>Choose Your Numbers</h3>

<p>You get to pick a number from 00-99. If you are looking for a more complex selection, you can choose “Panna” (of three digits such as Images), “Jodi” (two numbers joined together) or Jugging (for an exclusive set of 3 figures). There are different odds for each type of selection. A single number would be very easy to win on, whereas a panna (3 digit selection) would normally require several tries to win on.</p>

<h3>Place Your Bet</h3>

<p>Make outside bets online through reputable apps, sites or agents. Actual stakes: ₹100, or play with ₹1000 to get a bit more bold. All of that’s easy on digital platforms — deposit money, pick an etf market and confirm.</p>

<h3>Await the Results</h3>

<p>Every market has defined times for results to be published, either daily or weekly. The results for some markets are only available at the end of the day. An example of this is that the results for the Delhi Bazaar are not released until the following morning, whereas the results from Disawar could be made available before midnight on the same day.</p>

<h3>Claim Your Winnings</h3>

<p>Match the drawn number? Congratulations! Payouts range from 90x your bet for straightforward wins to or over 960x for shrewd play such as full Pannas. Reputable sites pay out winnings instantly.</p>

<p>Pro Tip: Be sure to check market times to avoid missing out. You will develop enough practice to recognize trends, but luck is what the fates prefer.</p>

<h2>What is Jodi, Crossing, Haruf in Satta King?</h2>

<h3>Jodi</h3>

<p>The numbers 01 to 100 are known as jodi. You choose your own favourite lucky number and place a wager.</p>

<p>Example: 11, 22, 33, 44, 55, 66, 77, 88,99 ,00 are Jodi.</p>

<p>The numbers 1 through 10 are called munda.</p>

<p>11-100 are known as jodi.</p>

<p>Some numbers, such as between 11 and 100, are also known as joda.</p>

<h3>Crossing</h3>

<p>Many players also play crossing. Crossing is constructed with three numbers and you can play around 3 to 8–9 numbers.</p>

<p>Example: 123456 is a "6-number crossing".</p>

<p>In this, 36 jodi are formed.</p>

<p>If you say jodi cut, then 6 are out of jodi means there r 30 jodi left.</p>

<h3>Haruf</h3>

<p>In his voice breaks and in bed, Haruf speaks of one number only.</p>

<p>Example: 1 is a haruf.</p>

<p>If you play it, 10 jodi will be made.</p>

<p>You also need to state whether it is Ander (inside) or Bahar (outside) before you begin.</p>

<p>If you play side A only 10 jodi are created.</p>

<p>If you double play through front or back side AB then twenty jodi are made.</p>

<p>If you haruf, your chances of getting through are higher.</p>

<h2>The Most Essential Satta King Markets Reveal Below must know</h2>

<p>Satta King has many types and forms, however all the markets are simply the same as large regionally related markets therefore, each individual market has its own unique pattern, crowd and beat. The following are the markets that we found to be the most interesting to us.</p>

<p>Delhi Bazaar Satta: The veteran’s favourite, providing daily results that keep the Delhi gaming scene vibrant.</p>

<p>Disawar Satta: A midnight risk for the high rollers, famous for attracting a large number of players and its strong live draws.</p>

<p>Faridabad Satta: A rising star with a new face and trends chasing perfect for beginners.</p>

<p>Ghaziabad Satta: Interactive and vibey with the real time offer.</p>

<p>Gali Satta: Out of nowhere and at unlikely hours, its draw is seducing night-owls across the country.</p>

<p>You can check specialised websites and apps, like B7 Satta, for real-time results. The online communities that Satta King creates, where participants exchange advice and celebrate victories, are the market that powers the company's social effect.</p>

<h2>The Risks: Play Smart, Not Safe</h2>

<h3>Financial Endangerment</h3>

<p>Although the odds are against you, gambling should be entertainment; not get-rich-quick. Please gamble responsibly.</p>

<h3>The Addiction Potential</h3>

<p>Fast pulls and big-win dreams can be addictive. To make it all fun, establish limits.</p>

<h3>Legal Grey Areas</h3>

<p>It involves fines and is forbidden in much of India. Keep abreast on local legislation.</p>

<h3>Scam Alert</h3>

<p>Fraud is bred by criminal activity. Avoid con artists by ciphering up on reputable websites. The ability to make safer choices is derived from knowledge, not advertisement.</p>

<p>The authority to make safer decisions comes from knowledge, not promotion.</p>

<h2>Platforms like B7 Satta's Function</h2>

<p>B7 Satta is one of the oldest and most trusted market for “Satta Matka” results on the internet. Designed for the purpose of disseminating information quickly, correctly, and in an honest manner, our website attracts thousands of visitors every day, who are relied upon to keep them updated. We are committed to the Satta King category, publishing superfast results of all Satta King games on our website, and giving you correct results and updates very quickly in no time at https://www.7asatta.com.</p>

<p>On our website, we have a list of various games including the best markets such as Delhi Bazaar, Disawar, Gali, Ajmer Sarif, Ghaziabad, and Shree Ganesh, and also there are some regional games such as Golden City, Navi Mumbai, Sadar Bazaar, Cyber City Gurgaon, Paisa Bazaar, and many more. Each result is accompanied by a complete record, allowing one to view previous results and become a better predictor.</p>

<p>Besides results, B7 Satta also provides “Pakad Jodi” numbers, Rashi charts, and expert advice shared by experienced players. Such community features allow visitors to benefit from observations and improve their plans. And the most important thing, we do not organize and promote gambling in any form - but are just some</p>

<h2>The B7 Satta Edge - How We Stay On Top of The Market</h2>

<p>Satta is the king of sattaplay in the fast-paced universe of B7!</p>

<h3>Ultra-Fast Live Results</h3>

<p>Timing is crucial in Satta. Because B7 Satta offers live results, you won't need to look elsewhere because you'll find all the results in one location.</p>

<h3>Simple Record Charts</h3>

<p>B7 Satta offers satta king game record charts that let you predict the next number, see the game tricks ahead of time, and eliminate any losing chances.</p>

<h3>User-Friendly Interface</h3>

<p>Both novices and experts can navigate the platform to view results, chart invites, and updates thanks to its user-friendly interface.</p>

<h3>Reliability and Accuracy</h3>

<p>B7 Satta consistently strives to be a daily OMG winner in an environment where many websites lack reliability.</p>

<h3>Security and Privacy</h3>

<p>B7 Satta provides consumers with privacy while they view the findings thanks to robust security levels.</p>

<p>Being a market leader in the B7 satta matka industry, B7 Satta is not like other websites.</p>

<h2>Strategy & Predictions: Win with smarts</h2>

<p>At B7 Satta, we demonstrate our support for our customers by giving them all the information they require to place wise wagers. We provide insights rather than just statistics.</p>

<h3>Expert Pakad Jodi</h3>

<p>Access premium "Pakad Jodi" posts from seasoned punters. These experts draw on years of experience and historical record charts to determine winning combinations.</p>

<h3>Rashi and Family Charts (1–100)</h3>

<p>Make use of our Rashi-based charts. [related] You can practise forecasting by using family numbers, Rashi patterns, and other similar occurrences.</p>

<h3>More Chance Of Winning</h3>

<p>You will not only become the best fantasy player but a data-driven strategy will up your chances of winning.</p>
                </Readmore>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <FAQ /> */}
    </div>
  );
};

export default Home;





