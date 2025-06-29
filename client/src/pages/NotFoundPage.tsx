import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/global.scss"

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const iconsForFour = [
        ["fa-ticket", "fa-star", "fa-heart"],
        ["fa-bolt", "fa-fire", "fa-moon"],
  ];

  const actions = [
    { icon: "fa-home", title: "Go Home", desc: "Return to our homepage", link: "/" },
    { icon: "fa-calendar-days", title: "Browse Events", desc: "Discover amazing events", link: "/events" },
    { icon: "fa-headset", title: "Get Help", desc: "Contact our support team", link: "/contact" },
    { icon: "fa-arrow-left", title: "Go Back", desc: "Return to previous page", link: "prev" },
  ];
    
  const iconsForZero = ["fa-music", "fa-calendar", "fa-location-dot"];

  return (
    <main className="min-h-[100vh] flex items-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-8">
      <div className="container mx-auto px-4 max-w-[1000px] text-center">
        {/* 404 Digits */}
        <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
          {["4", "0", "4"].map((digit, index) => (
            <div key={index} className="relative inline-block">
              <span className="text-[8rem] md:text-[5rem] sm:text-[4rem] font-extrabold text-primary drop-shadow-md leading-none">
                {digit}
              </span>
              <div className="absolute inset-0 pointer-events-none">
                {digit === "0" ? (
                  <>
                    {iconsForZero.map((icon, i) => (
                      <i
                        key={i}
                        className={`fa-solid ${icon} floating-icon-${i + 1} opacity-60`}
                      ></i>
                    ))}
                  </>
                ) : (
                  <>
                    {iconsForFour[index === 0 ? 0 : 1].map((icon, i) => (
                      <i
                        key={i}
                        className={`fa-solid ${icon} floating-ticket-${i + 1} opacity-60`}
                      ></i>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
            The page you're looking for seems to have vanished like a sold-out concert ticket! Don't worry, we'll help you find your way back to the show.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 max-w-[500px] mx-auto">
            <div className="flex flex-1 min-w-[250px] items-center border border-input rounded-[var(--radius)] px-3 py-2">
              <i className="fa-solid fa-search text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search for events, venues, or artists..."
                className="w-full bg-transparent focus:outline-none text-sm"
              />
            </div>
            <button className="inline-flex items-center gap-2 whitespace-nowrap h-10 rounded-[var(--radius)] bg-primary text-primary-foreground px-4 text-sm hover:bg-primary-hover transition">
              <i className="fa-solid fa-search" />
              Search
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-8">
            What would you like to do?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-[800px] mx-auto">
          {actions.map((action, i) => {
            const isGoBack = action.link === "prev";
            return isGoBack ? (
              <button
                key={i}
                onClick={() => navigate(-1)}
                className="flex flex-col items-center p-6 border border-border bg-background rounded-[var(--radius)] transition-transform hover:-translate-y-1 hover:shadow-lg hover:border-primary"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/5 text-primary mb-4 transition hover:bg-primary hover:text-primary-foreground">
                  <i className={`fa-solid ${action.icon} text-2xl`} />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-1">{action.title}</h4>
                <p className="text-sm text-muted-foreground text-center">{action.desc}</p>
              </button>
            ) : (
              <Link
                key={i}
                to={action.link}
                className="flex flex-col items-center p-6 border border-border bg-background rounded-[var(--radius)] transition-transform hover:-translate-y-1 hover:shadow-lg hover:border-primary"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/5 text-primary mb-4 transition hover:bg-primary hover:text-primary-foreground">
                  <i className={`fa-solid ${action.icon} text-2xl`} />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-1">{action.title}</h4>
                <p className="text-sm text-muted-foreground text-center">{action.desc}</p>
              </Link>
            );
          })}

          </div>
        </div>
      </div>
    </main>
  );
};
