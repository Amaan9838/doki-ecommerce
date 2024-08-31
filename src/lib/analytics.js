// analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-RERCB1HZDM"); // Replace with your GA Measurement ID
};

export const logEvent = (category, action, label = "") => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const logPageView = () => {
  ReactGA.send("pageview");
};
