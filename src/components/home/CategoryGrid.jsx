import { Link } from 'react-router-dom';

const items = [
  {
    name: 'Beds & Dressing',
    to: '/shop?category=beds-and-dressing',
    icon: (
      <svg className="w-12 h-12 transition-colors group-hover:text-black" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Headboard */}
        <path d="M6 14H42V36" strokeLinecap="round" strokeLinejoin="round" />
        {/* Mattress frame */}
        <rect x="6" y="24" width="36" height="12" rx="1" strokeLinejoin="round" />
        {/* Pillows */}
        <rect x="9" y="18" width="13" height="6" rx="1" strokeLinejoin="round" />
        <rect x="26" y="18" width="13" height="6" rx="1" strokeLinejoin="round" />
        {/* Bed sheet fold */}
        <path d="M6 29H42" />
        {/* Legs */}
        <line x1="8" y1="36" x2="8" y2="41" strokeLinecap="round" />
        <line x1="40" y1="36" x2="40" y2="41" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Sofas',
    to: '/shop?category=sofas',
    icon: (
      <svg className="w-12 h-12 transition-colors group-hover:text-black" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Backrest */}
        <path d="M8 18C8 16 9.5 15 11.5 15H36.5C38.5 15 40 16 40 18V28H8V18Z" strokeLinejoin="round" />
        {/* Seat Cushion */}
        <rect x="8" y="28" width="32" height="6" rx="1" strokeLinejoin="round" />
        {/* Cushions divisions */}
        <line x1="24" y1="15" x2="24" y2="34" />
        {/* Left Armrest */}
        <path d="M4 22H8V34H6C4.9 34 4 33.1 4 32V22Z" strokeLinejoin="round" />
        {/* Right Armrest */}
        <path d="M40 22H44V32C44 33.1 43.1 34 42 34H40V22Z" strokeLinejoin="round" />
        {/* Legs */}
        <line x1="9" y1="34" x2="7" y2="40" strokeLinecap="round" />
        <line x1="39" y1="34" x2="41" y2="40" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Dining',
    to: '/shop?category=dining',
    icon: (
      <svg className="w-12 h-12 transition-colors group-hover:text-black" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Table top */}
        <line x1="8" y1="28" x2="40" y2="28" strokeLinecap="round" />
        {/* Table legs */}
        <line x1="14" y1="28" x2="14" y2="42" strokeLinecap="round" />
        <line x1="34" y1="28" x2="34" y2="42" strokeLinecap="round" />
        {/* Left chair */}
        <path d="M10 28H6V20C6 19 7 18 8 18H10" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="6" y1="28" x2="6" y2="42" strokeLinecap="round" />
        <line x1="10" y1="28" x2="10" y2="34" strokeLinecap="round" />
        {/* Right chair */}
        <path d="M38 28H42V20C42 19 41 18 40 18H38" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="42" y1="28" x2="42" y2="42" strokeLinecap="round" />
        <line x1="38" y1="28" x2="38" y2="34" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Coffee Chair',
    to: '/shop?category=coffee-chair',
    icon: (
      <svg className="w-12 h-12 transition-colors group-hover:text-black" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Tall Backrest with wings */}
        <path d="M15 13C15 13 14 16 12 18V28H36V18C34 16 33 13 33 13H15Z" strokeLinejoin="round" strokeLinecap="round" />
        {/* Cushion seat */}
        <path d="M10 28H38V32C38 33 37 34 36 34H12C11 34 10 33 10 32V28Z" strokeLinejoin="round" />
        {/* Left armrest curving */}
        <path d="M10 24C10 24 7 25 7 28C7 31 10 31 10 31" strokeLinejoin="round" />
        {/* Right armrest curving */}
        <path d="M38 24C38 24 41 25 41 28C41 31 38 31 38 31" strokeLinejoin="round" />
        {/* Legs */}
        <line x1="14" y1="34" x2="12" y2="41" strokeLinecap="round" />
        <line x1="34" y1="34" x2="36" y2="41" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Console',
    to: '/shop?category=console',
    icon: (
      <svg className="w-12 h-12 transition-colors group-hover:text-black" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Cabinet main body */}
        <rect x="6" y="16" width="36" height="22" rx="1" strokeLinejoin="round" />
        {/* Horizontal divider */}
        <line x1="6" y1="25" x2="42" y2="25" />
        {/* Vertical divider */}
        <line x1="24" y1="16" x2="24" y2="38" />
        {/* Drawer panels details (top left & right) */}
        <line x1="11" y1="20.5" x2="15" y2="20.5" strokeLinecap="round" />
        <line x1="33" y1="20.5" x2="37" y2="20.5" strokeLinecap="round" />
        {/* Knobs for bottom doors */}
        <circle cx="21" cy="30" r="1" fill="currentColor" />
        <circle cx="27" cy="30" r="1" fill="currentColor" />
        {/* Legs */}
        <line x1="9" y1="38" x2="7" y2="43" strokeLinecap="round" />
        <line x1="39" y1="38" x2="41" y2="43" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'LED Rack',
    to: '/shop?category=led-rack',
    icon: (
      <svg className="w-12 h-12 transition-colors group-hover:text-black" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* TV Screen */}
        <rect x="11" y="10" width="26" height="15" rx="1" strokeLinejoin="round" />
        {/* TV stand */}
        <path d="M20 25L18 29H30L28 25" strokeLinejoin="round" />
        {/* Console table top */}
        <line x1="6" y1="29" x2="42" y2="29" strokeLinecap="round" />
        {/* Cabinet body */}
        <rect x="6" y="29" width="36" height="11" rx="1" strokeLinejoin="round" />
        {/* Drawers divider */}
        <line x1="18" y1="29" x2="18" y2="40" />
        <line x1="30" y1="29" x2="30" y2="40" />
        {/* Drawer knobs/details */}
        <line x1="11" y1="34.5" x2="13" y2="34.5" strokeLinecap="round" />
        <line x1="23" y1="34.5" x2="25" y2="34.5" strokeLinecap="round" />
        <line x1="35" y1="34.5" x2="37" y2="34.5" strokeLinecap="round" />
        {/* Legs */}
        <line x1="8" y1="40" x2="8" y2="43" strokeLinecap="round" />
        <line x1="40" y1="40" x2="40" y2="43" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Wardrobe',
    to: '/shop?category=wardrobe',
    icon: (
      <svg className="w-12 h-12 transition-colors group-hover:text-black" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Outer tall cabinet frame */}
        <rect x="10" y="8" width="28" height="32" rx="1" strokeLinejoin="round" />
        {/* Double doors vertical divider */}
        <line x1="24" y1="8" x2="24" y2="40" />
        {/* Handles */}
        <line x1="22" y1="20" x2="22" y2="24" strokeLinecap="round" />
        <line x1="26" y1="20" x2="26" y2="24" strokeLinecap="round" />
        {/* Drawer details at bottom */}
        <line x1="10" y1="32" x2="38" y2="32" />
        <line x1="24" y1="32" x2="24" y2="40" />
        {/* Legs */}
        <line x1="13" y1="40" x2="11" y2="43" strokeLinecap="round" />
        <line x1="35" y1="40" x2="37" y2="43" strokeLinecap="round" />
      </svg>
    )
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-border-light">
      <div className="container-page">
        <div className="mb-12 text-center">
          <h2 className="text-2.5xl md:text-3.5xl font-semibold text-primary tracking-tight" style={{ fontFamily: 'var(--font-heading, inherit)' }}>
            Explore Our Furniture Range
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-12 max-w-4xl mx-auto px-4">
          {items.map((item, index) => (
            <Link 
              key={index} 
              to={item.to} 
              className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 w-[28%] sm:w-[20%] md:w-[110px]"
            >
              <div className="flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-105 mb-3 text-secondary group-hover:text-black">
                {item.icon}
              </div>
              <span className="text-xs md:text-sm font-medium text-secondary tracking-wide leading-tight group-hover:text-black transition-colors duration-200">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
