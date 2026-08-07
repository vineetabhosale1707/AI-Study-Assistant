function FeatureCard({ icon, title, description }) {

  return (
    <div className="panel feature-card">

      <span className="card-icon-circle">
        {icon}
      </span>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;
