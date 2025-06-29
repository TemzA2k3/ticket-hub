export const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Former event industry executive with 15+ years of experience building memorable experiences.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Tech visionary who previously led engineering teams at major ticketing platforms.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Operations expert ensuring smooth experiences for both event organizers and attendees.",
    },
    {
      name: "David Kim",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Creative director focused on making event discovery and ticket purchasing delightful.",
    },
  ]

  const milestones = [
    {
      year: "2025",
      title: "Company Founded",
      description: "TicketHub was born from a vision to simplify event ticketing",
    },
    // {
    //   year: "2021",
    //   title: "First Million Tickets",
    //   description: "Reached our first major milestone of 1M tickets sold",
    // },
    // { year: "2022", title: "Mobile App Launch", description: "Launched our mobile app for iOS and Android platforms" },
    // {
    //   year: "2023",
    //   title: "International Expansion",
    //   description: "Expanded to serve events in 15+ countries worldwide",
    // },
    // {
    //   year: "2024",
    //   title: "AI-Powered Recommendations",
    //   description: "Introduced smart event recommendations using machine learning",
    // },
  ]

  const values = [
    {
      icon: "fa-users",
      title: "Community First",
      description:
        "We believe events bring people together and create lasting memories. Our platform is built to strengthen communities.",
    },
    {
      icon: "fa-shield-alt",
      title: "Trust & Security",
      description:
        "Your data and transactions are protected with enterprise-grade security. We're committed to maintaining your trust.",
    },
    {
      icon: "fa-lightbulb",
      title: "Innovation",
      description:
        "We continuously innovate to make event discovery and ticketing more intuitive and enjoyable for everyone.",
    },
    {
      icon: "fa-heart",
      title: "Passion for Events",
      description:
        "We're event enthusiasts ourselves. We understand the excitement and work to preserve that magic in every interaction.",
    },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About TicketHub</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to connect people through unforgettable experiences. Since 2025, TicketHub has been the
            trusted platform where event organizers and attendees come together to create magical moments.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { number: "10M+", label: "Tickets Sold", icon: "fa-ticket" },
            { number: "50K+", label: "Events Hosted", icon: "fa-calendar" },
            { number: "2M+", label: "Happy Customers", icon: "fa-users" },
            { number: "15+", label: "Countries Served", icon: "fa-globe" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center text-2xl">
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  TicketHub was founded in 2025 when our team realized that finding and attending great events shouldn't
                  be complicated. We saw event organizers struggling with complex ticketing systems and attendees
                  frustrated by poor user experiences.
                </p>
                <p>
                  Starting with a simple idea – make event ticketing as easy as ordering coffee – we built a platform
                  that puts user experience first. Today, we're proud to serve millions of event-goers and thousands of
                  organizers worldwide.
                </p>
                <p>
                  Our journey has been driven by one core belief: great events create great memories, and technology
                  should enhance, not complicate, that experience.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="text-2xl font-bold text-black mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 border border-gray-200 rounded-lg bg-white shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-full bg-black text-white flex items-center justify-center text-xl">
                  <i className={`fa-solid ${value.icon}`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <div className="text-gray-600 font-medium mb-3">{member.role}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            To democratize event experiences by providing the most intuitive, secure, and comprehensive ticketing
            platform that connects communities and creates lasting memories.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Join Our Team
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-white transition-colors font-medium">
              Partner With Us
            </button>
          </div> */}
        </div>
      </div>
    </section>
  )
}
