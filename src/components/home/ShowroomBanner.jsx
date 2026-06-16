import Button from '../ui/Button';

export default function ShowroomBanner() {
  return (
    <section className="section-space bg-white">
      <div className="container-page bg-bg-light px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Visit Our Islamabad Showroom</h2>
            <p className="mt-3 text-sm leading-6 text-secondary">Main G.T. Rd, opposite Science School Rd, T Chowk, Islamabad</p>
            <p className="mt-2 text-sm text-primary">0345-9229581 | Mon-Thu & Sat-Sun 10:30AM-9:30PM, Fri Closed</p>
          </div>
          <Button as="a" href="https://maps.google.com/?q=Main+GT+Road+T+Chowk+Islamabad" target="_blank" rel="noreferrer" variant="outline">
            Get Directions
          </Button>
        </div>
      </div>
    </section>
  );
}
