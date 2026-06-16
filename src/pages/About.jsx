import ShowroomBanner from '../components/home/ShowroomBanner';

export default function About() {
  const stats = ['2,400+ Clients', '500+ Products', '15+ Years', '1 Showroom'];
  const values = ['Quality', 'Craftsmanship', 'Customer First'];
  return (
    <main className="bg-white">
      <section className="border-b border-border-light bg-bg-light py-16">
        <div className="container-page">
          <h1 className="text-4xl font-semibold text-primary">About Wood Mart</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-secondary">Wood Mart is a premium furniture store in Islamabad focused on clean design, durable materials, and furniture that fits real homes. From sofas and bedroom sets to dining furniture and wardrobes, every piece is selected for comfort, longevity, and everyday use.</p>
        </div>
      </section>
      <section className="container-page grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => <div key={stat} className="border border-border-light p-6 text-xl font-semibold text-primary">{stat}</div>)}
      </section>
      <section className="container-page pb-12">
        <h2 className="text-2xl font-semibold text-primary">Our Values</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map(value => <div key={value} className="border border-border-light p-6 text-sm leading-6 text-secondary"><span className="mb-2 block text-base font-semibold text-primary">{value}</span>Furniture should be beautiful, practical, and supported by honest service.</div>)}
        </div>
      </section>
      <ShowroomBanner />
    </main>
  );
}
