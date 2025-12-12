import React from 'react'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      
    <section className="topboxnew">
        <div className="container-fluid">
        <div className="col-md-16 nopadding">
            <div className="newnav">
            <ul>
                <li>
                <Link className="" to="/home">
                    Home
                </Link>
                </li>
                <li>
                <Link className="" to="/charts">
                    Chart
                </Link>
                </li>
                <li>
                <Link className="" to="/contact">
                    Contact
                </Link>
                </li>
                <li>
                <Link className="" to="/disclaimer">
                    Disclaimer
                </Link>
                </li>
            </ul>
            <div className="clearfix" />
            </div>
            <div className="text_slide">
            <marquee style={{ color: "#fff" }}>
                {/* <p style={{ fontSize: 16, textAlign: "center" }}>
                7B Satta is an information portal that keeps Satta King players
                updated with verified, real-time draw results and daily charts for markets like Gali, Faridabad and Ghaziabad.
                </p> */}
                 <p className="hintext" style={{ padding: 0 }}>
                  हा भाई यही आती हे सबसे पहले खबर रूको और देखो
                </p>
            </marquee>
            </div>
        </div>
        </div>
    </section>
    <section className="sattalogo">
        <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
            <Link
                title="7B Satta"
                to="/"
                className="blink"
                style={{ display: "inline", opacity: "0.877126" }}
            >
                <h1 style={{ margin: 0, fontWeight: 700 }}>7B Satta Official</h1>
            </Link>
            </div>
        </div>
        </div>
    </section>
    </div>
  )
}

export default Header
