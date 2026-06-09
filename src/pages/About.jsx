import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight, scaleIn, staggerContainer } from '../utils/animations';

const timeline = [
  { year: '2010', title: 'Founded', desc: 'Wood Mart opens its first showroom in Blue Area, Islamabad.' },
  { year: '2014', title: 'Second Showroom', desc: 'Expanded to F-7 Markaz with a larger display floor.' },
  { year: '2018', title: 'Online Launch', desc: 'Launched woodmart.pk for nationwide furniture delivery.' },
  { year: '2022', title: '500+ Products', desc: 'Reached milestone of 500 handcrafted furniture pieces.' },
  { year: '2024', title: 'Industry Award', desc: 'Named Best Furniture Retailer at Pakistan Design Awards.' },
  { year: '2026', title: 'Third Location', desc: 'Opened Rawalpindi showroom to serve twin cities.' },
];

const values = [
  { title: 'Quality', desc: 'We never compromise on materials or craftsmanship. Every piece meets our rigorous quality standards.' },
  { title: 'Sustainability', desc: 'Responsibly sourced wood from certified forests. Minimal waste in our workshop operations.' },
  { title: 'Customer First', desc: 'From showroom visit to after-sales support, your satisfaction drives everything we do.' },
];

const team = [
  { name: 'Ahmed Raza', role: 'Founder & CEO', photo: 'https://picsum.photos/seed/team1/300/300' },
  { name: 'Sara Jamil', role: 'Head of Design', photo: 'https://picsum.photos/seed/team2/300/300' },
  { name: 'Hassan Khan', role: 'Master Craftsman', photo: 'https://picsum.photos/seed/team3/300/300' },
  { name: 'Fatima Ali', role: 'Customer Experience', photo: 'https://picsum.photos/seed/team4/300/300' },
];

const awards = [
  'Pakistan Design Awards 2024 — Best Furniture Retailer',
  'Islamabad Chamber of Commerce — Excellence in Craftsmanship 2023',
  'Furniture Manufacturers Association — Quality Certification',
  'Green Pakistan Initiative — Sustainable Sourcing Partner',
];

export default function About() {
  return (
    <div className="pt-24 bg-cream">
      {/* Hero — dark */}
      <section className="section-dark bg-brown py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.span variants={fadeInUp} initial="hidden" animate="visible" className="section-tag text-gold-light">
            Our Story
          </motion.span>
          <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl md:text-5xl text-white mt-4">
            Crafting Homes Since 2010
          </motion.h1>
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-lighttext text-xl mt-4">
            Furniture That Fits Your Life
          </motion.p>
        </div>
      </section>

      {/* Timeline — light */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-darktext text-center mb-12">Our Journey</h2>
          <div className="relative space-y-0">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-beige-dark hidden sm:block" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                variants={i % 2 === 0 ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex gap-6 items-start pb-10 relative"
              >
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shrink-0 font-serif font-bold text-darktext z-10 border-4 border-cream">
                  {item.year.slice(2)}
                </div>
                <div className="pt-2">
                  <p className="text-gold font-bold text-sm">{item.year}</p>
                  <h3 className="font-serif text-lg text-darktext mt-0.5">{item.title}</h3>
                  <p className="text-brown-light text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission — beige */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-darktext text-center mb-12">Mission & Values</h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <motion.div key={v.title} variants={scaleIn} className="text-center p-8 bg-white border border-beige-dark rounded-lg">
                <div className="w-14 h-14 bg-beige rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-2xl">✦</span>
                </div>
                <h3 className="font-serif text-xl text-darktext mb-3">{v.title}</h3>
                <p className="text-brown-light text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team — light */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-darktext text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center bg-white border border-beige-dark rounded-lg p-4">
                <img src={member.photo} alt={member.name} className="w-full aspect-square object-cover rounded-lg mb-3" loading="lazy" />
                <h3 className="font-serif text-darktext">{member.name}</h3>
                <p className="text-gold text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop — dark */}
      <section className="section-dark py-20 bg-brown">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-white text-center mb-12">Our Workshop</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <img key={i} src={`https://picsum.photos/seed/workshop${i}/600/400`} alt={`Workshop ${i + 1}`} className="w-full aspect-[3/2] object-cover rounded" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Stats — dark */}
      <section className="section-dark py-16 bg-brown border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '2,400+', label: 'Happy Clients' },
            { num: '500+', label: 'Products' },
            { num: '15+', label: 'Years' },
            { num: '3', label: 'Showrooms' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-4xl text-gold">{s.num}</p>
              <p className="text-lighttext text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards — beige */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-darktext text-center mb-12">Awards & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {awards.map((award) => (
              <div key={award} className="bg-white border border-beige-dark rounded-lg p-4 text-sm text-darktext flex items-center gap-3">
                <span className="text-2xl">🏆</span> {award}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
