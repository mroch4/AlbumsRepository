export const LoaderComponent = (): JSX.Element => {
  return (
    <section className="d-flex flex-column justify-content-center align-items-center loader-wrapper">
      <div className="loader">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <span className="text-white my-3">Loading...</span>
    </section>
  );
};
