import { useState } from "react";
import FeatureCard from "./FeatureCard";

function Features() {

  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");

  const features = [
    {
      icon: "📝",
      title: "AI Summary",
      description: "Generate concise summaries."
    },
    {
      icon: "❓",
      title: "MCQs",
      description: "Test yourself with AI-generated MCQs."
    },
    {
      icon: "🧠",
      title: "Flash Cards",
      description: "Revise quickly with flashcards."
    },
    {
      icon: "💬",
      title: "Chat with Notes",
      description: "Ask questions about your notes."
    },
    {
      icon: "📖",
      title: "Easy Explanations",
      description: "Understand difficult topics in simple words."
    }
  ];


  const filteredFeatures = features.filter((feature) =>
    feature.title.toLowerCase().includes(searchText.toLowerCase())
  );


  const displayedFeatures = showAll
    ? filteredFeatures
    : filteredFeatures.slice(0, 3);


  return (
    <section>
      <h2>Features</h2>


      <input
        type="text"
        placeholder="Search features..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />


      <div className="features-container">

        {displayedFeatures.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>


      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "Show More"}
      </button>

    </section>
  );
}

export default Features;