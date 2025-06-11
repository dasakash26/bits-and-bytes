import {
  Award,
  BookOpen,
  Clock,
  Globe,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "50K+",
      label: "Monthly Readers",
      description: "Growing 25% month over month",
      gradient: "from-blue-500 to-purple-500",
      hoverGradient:
        "hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950",
    },
    {
      icon: Users,
      value: "500+",
      label: "Active Contributors",
      description: "Industry experts and rising stars",
      gradient: "from-green-500 to-teal-500",
      hoverGradient:
        "hover:from-green-50 hover:to-teal-50 dark:hover:from-green-950 dark:hover:to-teal-950",
    },
    {
      icon: BookOpen,
      value: "1.5K+",
      label: "Published Articles",
      description: "In-depth technical content",
      gradient: "from-orange-500 to-red-500",
      hoverGradient:
        "hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-950 dark:hover:to-red-950",
    },
    {
      icon: Globe,
      value: "180+",
      label: "Countries Reached",
      description: "Global developer network",
      gradient: "from-purple-500 to-pink-500",
      hoverGradient:
        "hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950 dark:hover:to-pink-950",
    },
  ];

  const features = [
    {
      icon: Award,
      title: "Expert-Led Content",
      description: "Articles vetted by industry professionals",
    },
    {
      icon: Clock,
      title: "Daily Fresh Content",
      description: "New insights and tutorials every day",
    },
    {
      icon: Target,
      title: "Community Driven",
      description: "Built by developers, for developers",
    },
  ];

  return (
    <section id="stats" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Impact</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Building the largest knowledge-sharing ecosystem for developers
          worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-6 rounded-lg bg-muted/30 hover:bg-gradient-to-br ${stat.hoverGradient} transition-all duration-300`}
          >
            <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
            <div
              className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
            >
              {stat.value}
            </div>
            <div className="text-muted-foreground">{stat.label}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
