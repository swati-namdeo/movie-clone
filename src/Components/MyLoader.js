import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={900}
    height={700}
    viewBox="0 0 430 300"
    backgroundColor="#0e65f1"
    foregroundColor="rgb(217, 24, 186)"
    className="contentLoad"
    {...props}
  >
    <rect x="20" y="10" rx="15" ry="15" width="130" height="220" />
    <rect x="160" y="15" rx="3" ry="3" width="50" height="15" />
    <rect x="215" y="15" rx="3" ry="3" width="50" height="15" />
    <rect x="270" y="15" rx="3" ry="3" width="50" height="15" />
    <rect x="325" y="15" rx="3" ry="3" width="50" height="15" />

    <rect x="160" y="35" rx="3" ry="3" width="200" height="1" />

    <rect x="160" y="45" rx="3" ry="3" width="70" height="8" />
    <rect x="300" y="45" rx="3" ry="3" width="70" height="8" />

    <rect x="160" y="60" rx="3" ry="3" width="100" height="50" />
    <rect x="270" y="60" rx="3" ry="3" width="100" height="50" />
    <rect x="160" y="120" rx="3" ry="3" width="100" height="50" />
    <rect x="270" y="120" rx="3" ry="3" width="100" height="50" />
    <rect x="160" y="180" rx="3" ry="3" width="100" height="50" />
    <rect x="270" y="180" rx="3" ry="3" width="100" height="50" />

    <rect x="50" y="210" rx="3" ry="3" width="35" height="8" />
    <rect x="90" y="210" rx="3" ry="3" width="35" height="8" />

    <rect x="380" y="15" rx="3" ry="3" width="40" height="215" />
  </ContentLoader>
);

export default MyLoader;
