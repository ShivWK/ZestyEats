const VegSvg = ({ veg = false }) => {
    return <svg
            width="16"
            height="16"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              fill="none"
              stroke={veg ? "white" : "#00c951"}
              strokeWidth="8"
            />
            <circle cx="50" cy="50" r="25" fill={!veg ? "#00c951" : "white"} />
          </svg>
}

export default VegSvg;