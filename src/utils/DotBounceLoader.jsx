const DotBounceLoader = () => {
  return (
    <p className="-mb-1 flex items-center gap-1.5">
      <span
        className="animate-dotBounce text-white"
        style={{ fontSize: '20px', animationDelay: '0s' }}
      >
        •
      </span>
      <span
        className="animate-dotBounce text-white"
        style={{ fontSize: '20px', animationDelay: '0.2s' }}
      >
        •
      </span>
      <span
        className="animate-dotBounce text-white"
        style={{ fontSize: '20px', animationDelay: '0.4s' }}
      >
        •
      </span>
    </p>
  );
};

export default DotBounceLoader;
