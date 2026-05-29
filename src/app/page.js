import Navbar from './components/navbar';
import Hero from './components/hero';
import Servicos from './components/servicos';
import Contato from './components/contato';
import Footer from './components/footer';
import QuemSomos from './components/quemsomos';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Servicos />
      <Contato />
      <QuemSomos />
      <Footer / >
    </main>
  );
}