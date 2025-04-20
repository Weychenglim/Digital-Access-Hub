import Link from "next/link"
import { Users, Heart, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-teal-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Digital Access Hub</h1>
            <nav>
              <ul className="flex space-x-6 text-lg">
                <li>
                  <Link href="/" className="hover:underline font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:underline font-medium">
                    All Resources
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:underline font-medium">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline font-medium">
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Digital Access Hub</h1>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 mb-6">
            Digital Access Hub was founded with a simple but powerful mission: to bridge the digital divide for seniors
            and low-income families in our community.
          </p>
          <p className="text-xl text-gray-700 mb-6">
            We believe that access to digital resources and the skills to use them are essential in today's world. From
            healthcare to government services, education to community events, so much of our daily lives now requires
            digital literacy.
          </p>
          <p className="text-xl text-gray-700">
            Our goal is to ensure that no one is left behind due to lack of access, knowledge, or confidence in using
            technology.
          </p>
        </section>

        {/* Values Section */}
        <section className="bg-teal-50 py-16 rounded-xl mb-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-teal-600 p-4 rounded-full text-white">
                    <Users size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Inclusivity</h3>
                <p className="text-gray-700">
                  We design our services to be accessible to everyone, regardless of age, income, education, or ability.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-teal-600 p-4 rounded-full text-white">
                    <Heart size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Empathy</h3>
                <p className="text-gray-700">
                  We approach our work with understanding and patience, recognizing the unique challenges each person
                  faces.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-teal-600 p-4 rounded-full text-white">
                    <Award size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Empowerment</h3>
                <p className="text-gray-700">
                  We don't just provide access—we teach skills that enable independence and confidence in the digital
                  world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-xl text-gray-700 mb-6">
            Digital Access Hub began in 2020 when a group of community volunteers noticed how many seniors and
            low-income families were struggling to access essential services that had moved online during the pandemic.
          </p>
          <p className="text-xl text-gray-700 mb-6">
            What started as informal help sessions at the local library has grown into a comprehensive program with
            dedicated volunteers, community partnerships, and a physical location at the Community Center.
          </p>
          <p className="text-xl text-gray-700">
            Today, we serve hundreds of community members each month, helping them navigate everything from Medicare
            enrollment to job applications, video calls with family, and accessing community resources.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Maria Rodriguez</h3>
                <p className="text-teal-600 font-medium mb-4">Executive Director</p>
                <p className="text-gray-700 mb-4">
                  With 15 years of experience in community outreach, Maria leads our organization with passion and
                  vision.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">James Chen</h3>
                <p className="text-teal-600 font-medium mb-4">Technology Director</p>
                <p className="text-gray-700 mb-4">
                  James oversees our technical resources and develops accessible solutions for our community members.
                </p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Eleanor Washington</h3>
                <p className="text-teal-600 font-medium mb-4">Volunteer Coordinator</p>
                <p className="text-gray-700 mb-4">
                  Eleanor manages our amazing team of 50+ volunteers who provide one-on-one assistance to community
                  members.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="bg-gray-50 py-16 rounded-xl mb-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Partners</h2>
            <p className="text-xl text-gray-700 mb-12 text-center">
              We're grateful to work with these organizations to serve our community:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800">City Library</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800">Community Center</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800">Senior Services</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800">Tech For All</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800">Local Health Clinic</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800">City Government</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get Involved</h2>
          <p className="text-xl text-gray-700 mb-8">
            We're always looking for volunteers, partners, and supporters to help us bridge the digital divide in our
            community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/volunteer"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/donate"
              className="bg-white text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-teal-50 transition-colors"
            >
              Support Our Work
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Digital Access Hub</h3>
              <p className="text-gray-300">
                Helping seniors and low-income families access essential online resources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-300 hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-white">
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">123 Main Street</p>
              <p className="text-gray-300 mb-2">Anytown, USA 12345</p>
              <p className="text-gray-300 mb-2">(555) 123-4567</p>
              <p className="text-gray-300">help@digitalaccesshub.org</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2025 Digital Access Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
