export function LoadingSVG() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#fff"
          strokeWidth="4"
          opacity="0.2"
        />
        <path
          d="M44 24c0-11.046-8.954-20-20-20"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
