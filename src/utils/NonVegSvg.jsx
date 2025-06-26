const NonVegSvg = ({nonVeg = false }) => {
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
            stroke={nonVeg ? "white" :  "red"}
            strokeWidth="8"
          />
          <polygon points="50,20 78.86,70 21.14,70" fill={!nonVeg ? "red" : "white"} />
        </svg>
}

export default NonVegSvg;