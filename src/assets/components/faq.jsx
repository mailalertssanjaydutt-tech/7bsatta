import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="containers">
        <div className="wrapper">
          <div className="text-center">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {/* FAQ 1 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => toggleFAQ(0)}
              >
                <span className="sr">01.</span> What is Satta King and who developed it? 
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 0 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  Common Satta King type lottery game under gambling The actual name of the game is Satta Matka, which is a form of gambling in which people are betting on a number chosen by pot. Satta, a lottery-type game in which players pick the winning numbers, was invented randomly over decades while banned by the state. This patchwork makes a tiered city, in which cosmopolitanism and Disawar and Gali eat some nights of the week or each have their own seasons as if they were regional markets with different histories that in some cases could be told through mental banking.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 1 ? "active" : ""}`}
                onClick={() => toggleFAQ(1)}
              >
                <span className="sr">02.</span> Who is B7 Satta in the Satta King game?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 1 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  B7 Satta is among the best sites for actual Satta King results, records charts, online bets, and safe Satta betting sites. It provides gamers with a variety of services and support, such as real-time results, safe gaming rules, new draw warnings, and user data protection. Its solid reputation attracts both new and experienced gamblers searching for a website they can trust to offer transparency.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 2 ? "active" : ""}`}
                onClick={() => toggleFAQ(2)}
              >
                <span className="sr">03.</span> How can I play the Satta King with B7 Satta?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 2 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
A player must first register on the B7 Satta app or website, choose a market, choose a number between 00 and 99, and then wager on a range of bet types (such as Single, Jodi, and Panna) in order to play. whether the amount selected matches what was announced on those markets and territories after the draw.
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 3 ? "active" : ""}`}
                onClick={() => toggleFAQ(3)}
              >
                <span className="sr">04.</span> What are the main rates of payment for Satta King?
              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 3 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
					Typical kinds of wagers consist of:<br/>

					<b>Ank (Single):</b> Bet on a single number between 0 and 9.<br/>
<b>Jodi (Pair):</b> A pair is a wager that has two high or low numbers (00–99), and it is even used most often when the payout is beneficial.<br/>
<b>Panna (Treble):</b> Bet on several figures with three digits.<br/>
Pay tables and side bets are available, but I've only listed the most popular ones here. The maximum payments for each market and prediction could range from 90 to 960 times the wager.
					
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="container01">
              <div
                className={`question ${activeIndex === 4 ? "active" : ""}`}
                onClick={() => toggleFAQ(4)}
              >
                <span className="sr">05.</span> As a Satta King player, how can I monitor my Satta results? How can one be informed about any updates about the Satta King Bazaar?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 4 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  In addition to posting the official draw results on their website, B7 Satta promptly sponsored push alerts. Each market will have its own timestamp and online results page. Even though they can use algorithms and past performance to determine their bet, gamblers should select news from trustworthy sources to avoid being tricked.
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 5 ? "active" : ""}`}
                onClick={() => toggleFAQ(5)}
              >
                <span className="sr">06.</span> What rules does Satta King India have?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 5 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
                  In states where the lottery has been outlawed, it is regarded as unlawful and criminal. The possibility of being punished is eliminated if one bets on a person or an organization while knowing their nature, as this would be deemed unlawful. Users should check their local laws and regulations regarding Satta gambling or betting, as Satta may be prohibited there, even though playing the game online is illegal in India according to some arbitrary law.

                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 6 ? "active" : ""}`}
                onClick={() => toggleFAQ(6)}
              >
                <span className="sr">07.</span> What are the dangers of playing Satta King online versus offline?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 6 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">
					Important dangers consist of:<br/>
<b>Money loss:</b> The house has a decent chance.<br/>
<b>Addiction:</b> Playing fast-paced games with large prizes might make gambling addiction worse.<br/>
<b>Liability:</b> Gambling continuously is prohibited by law.<br/>
<b>Fake or cybersecurity:</b> Other websites appear on scam websites, and they make no guarantees regarding the safety of the money or data. People must have confidence in their privacy and safety when playing at places like B7 Satta.
				
                </div>
              </div>
            </div>

            <div className="container01">
              <div
                className={`question ${activeIndex === 7 ? "active" : ""}`}
                onClick={() => toggleFAQ(7)}
              >
                <span className="sr">08.</span> Which tactics can you use to win Satta King?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 7 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
Players use historical charts and trends in past outcomes tracking provided by B7 Satta of the "Secret Powerball Technique" to try and predict patterns of the numbers that will be drawn, even though no approach is perfect. These strategies can improve your betting experience without altering the odds. Prominent suppliers place a strong emphasis on avoiding losses and gambling for pleasure rather than profit, two crucial recommendations that Gasportal offers to individuals who make moral wagers.

                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 8 ? "active" : ""}`}
                onClick={() => toggleFAQ(8)}
              >
                <span className="sr">09.</span> How Does B7 Satta Guarantee Ethical Gaming and User Safety?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 8 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
B7 Satta prioritises safeguarding our users' privacy by enabling encryption when necessary to maintain the confidentiality of their personal data and by more covertly checking it. The website frequently offers guidance on topics like setting boundaries, recognising warning signs of danger, taking breaks, and getting help if a gambling problem is suspected. They can also refer persons to military support services if necessary and offer legal risk education.

                </div>
              </div>
            </div>
			
			<div className="container01">
              <div
                className={`question ${activeIndex === 9 ? "active" : ""}`}
                onClick={() => toggleFAQ(9)}
              >
                <span className="sr">10.</span> What distinguishes B7 Satta from other business partners such as A1 Satta, A2 Satta, A3 Satta, A4 Satta, A7 Satta, A8 Satta, and Lucky Satta?

              </div>
              <div
                className="answercont"
                style={{
                  maxHeight: activeIndex === 9 ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <div className="answer">                  
A1 Satta, A2 Satta, A3 Satta, A4 Satta, A7 Satta, and A8 Satta Now that Lucky Satta is mentioned in the betting model, they share their player support and verification results analysis with you. When combined, they provide a range of markets, aid in increasing the transparency of draw results, and encourage ethical betting. When they tip together, they build cross-platform trust, which opens up new possibilities and competitors.

                </div>
              </div>
            </div>


            {/* Add more FAQs below as needed */}
          </div>
        </div>
      </div>
    </section>
  );
}


