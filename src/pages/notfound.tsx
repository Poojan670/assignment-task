import React from "react";
import { Link } from "react-router-dom";

const notfound: React.FC = () => {
  return (
    <div>
      <section>
        <h1>Page Not found</h1>
      </section>
      <p>
        <Link to="/">Go Back</Link>
      </p>
    </div>
  );
};

export default notfound;
