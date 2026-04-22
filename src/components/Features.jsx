import React from "react";

const featuresData = [
  {
    icon: "⚙️",
    title: "Our Services",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: "💡",
    title: "Our Approach",
    description: "Lorem ipsum dolore consectetur adipisci.",
  },
  {
    icon: "🤝",
    title: "Why Choose Us",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing.",
  },

  {
    icon: "🤝",
    title: "Why Choose Us",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing.",
  },
  {
    icon: "🤝",
    title: "Why Choose Us",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing.",
  },
  {
    icon: "🤝",
    title: "Why Choose Us",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing.",
  },
];

const Features = () => {
  return (
    <section className="flex flex-wrap justify-center gap-6 p-6 md:p-12 bg-[#12122a]">
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 pt-22 mt-4 w-[400px] sm:w-[400px] text-center backdrop-blur-md hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="text-4xl font-poppins mb-4 text-cyan-300">{feature.icon}</div>
          <h3 className="text-white font-poppins text-lg mb-2">{feature.title}</h3>
          <p className="text-gray-300 font-poppins text-sm">{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;
