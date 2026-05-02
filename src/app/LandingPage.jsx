export default function LandingPage() {
  return (
    <div style={{ background: '#0A0C10', minHeight: '100vh', color: '#F0F2F5', fontFamily: 'system-ui, sans-serif' }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,12,16,0.92)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.3px' }}>CiudApp</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, color: '#8B95A5' }}>
          <a href="#que-es" style={navLink}>¿Qué es?</a>
          <a href="#como-funciona" style={navLink}>Cómo funciona</a>
          <a href="#descarga" style={navLink}>Descarga</a>
        </div>
        <a href="#descarga" style={ctaBtn}>Comenzar gratis</a>
      </nav>

      {/* Hero */}
      <section style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '100px 60px 80px',
        maxWidth: 860, margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: 999, padding: '6px 16px', marginBottom: 28,
          fontSize: 12, color: '#3B82F6', fontWeight: 600,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', animation: 'pulse 2s infinite' }} />
          Piloto activo en Chacao, Caracas
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900,
          lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: 24,
          background: 'linear-gradient(135deg, #F0F2F5 30%, #8B95A5)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Tu ciudad.<br />Tu voz.<br />Resultados reales.
        </h1>

        <p style={{
          fontSize: 20, color: '#8B95A5', lineHeight: 1.7, maxWidth: 540, marginBottom: 44,
        }}>
          CiudApp conecta a los ciudadanos con su alcaldía en tiempo real.
          Reporta problemas de tu comunidad y haz seguimiento hasta que se resuelvan.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#descarga" style={heroCta}>📱 Abrir la app</a>
          <a href="#como-funciona" style={heroSec}>Ver cómo funciona →</a>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 48, marginTop: 72, flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[
            { n: '+500', label: 'Reportes activos' },
            { n: '8',    label: 'Categorías de problemas' },
            { n: '24h',  label: 'Respuesta promedio' },
          ].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#3B82F6', letterSpacing: '-1px' }}>{s.n}</div>
              <div style={{ fontSize: 13, color: '#8B95A5', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ¿Qué es? */}
      <section id="que-es" style={{ padding: '80px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>¿Qué es CiudApp?</SectionLabel>
        <h2 style={sectionH2}>La red ciudadana que Venezuela necesita</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 48 }}>
          {[
            { icon: '🗺️', title: 'Mapa en vivo',     desc: 'Visualiza todos los reportes de tu zona en tiempo real sobre un mapa interactivo.' },
            { icon: '📡', title: 'Realtime',          desc: 'Las actualizaciones del municipio llegan al instante. Sin recargar, sin esperar.' },
            { icon: '🏛️', title: 'Canal directo',    desc: 'Chat bidireccional entre ciudadanos y la alcaldía, con badge de verificación oficial.' },
            { icon: '📊', title: 'Transparencia',     desc: 'Cada reporte tiene estado público: Nuevo, En proceso, Resuelto o Rechazado.' },
          ].map(c => (
            <div key={c.title} style={featureCard}>
              <span style={{ fontSize: 32, marginBottom: 14, display: 'block' }}>{c.icon}</span>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F0F2F5' }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#8B95A5', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" style={{ padding: '80px 60px', background: '#0D0F14' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel>Cómo funciona</SectionLabel>
          <h2 style={sectionH2}>Tres pasos, un impacto</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginTop: 48 }}>
            {[
              { n: '01', title: 'Toca el mapa',    desc: 'Toca cualquier punto de tu ciudad para marcar dónde está el problema.' },
              { n: '02', title: 'Reporta en 3 taps', desc: 'Categoría, foto y descripción. Menos de 30 segundos.' },
              { n: '03', title: 'La alcaldía actúa', desc: 'Recibes actualizaciones y puedes chatear directo con el equipo municipal.' },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: '#3B82F6',
                  letterSpacing: 2, marginBottom: 16,
                }}>{s.n}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#F0F2F5', marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: '#8B95A5', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section style={{ padding: '80px 60px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <SectionLabel>Categorías</SectionLabel>
        <h2 style={sectionH2}>Cubre los problemas más comunes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 40 }}>
          {[
            { e: '💧', l: 'Agua' }, { e: '💡', l: 'Luz' }, { e: '🗑️', l: 'Basura' },
            { e: '🚧', l: 'Vialidad' }, { e: '🚨', l: 'Seguridad' }, { e: '🔥', l: 'Gas' },
            { e: '🏥', l: 'Salud' }, { e: '🚌', l: 'Transporte' },
          ].map(c => (
            <div key={c.l} style={catPill}>
              <span>{c.e}</span><span style={{ fontWeight: 600 }}>{c.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Descarga / CTA */}
      <section id="descarga" style={{
        padding: '100px 60px',
        background: 'linear-gradient(160deg, rgba(59,130,246,0.08) 0%, transparent 60%)',
        textAlign: 'center',
      }}>
        <h2 style={{ ...sectionH2, fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>
          Lista para usar hoy
        </h2>
        <p style={{ color: '#8B95A5', fontSize: 16, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px' }}>
          CiudApp es una Progressive Web App — no necesitas descargar nada.
          Abre el navegador, guarda el ícono en tu pantalla y listo.
        </p>
        <a href="/mapa" style={{ ...heroCta, fontSize: 18, padding: '18px 48px' }}>
          Abrir CiudApp →
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px 60px', borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: '#4B5563', fontSize: 13, flexWrap: 'wrap', gap: 12,
      }}>
        <span>© 2026 CiudApp · Piloto Chacao, Venezuela</span>
        <span>Construido con ❤️ para la ciudadanía venezolana</span>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        a { text-decoration: none; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, letterSpacing: 2,
      color: '#3B82F6', textTransform: 'uppercase', marginBottom: 14,
    }}>
      {children}
    </div>
  )
}

const sectionH2 = {
  fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800,
  color: '#F0F2F5', letterSpacing: '-0.5px', lineHeight: 1.15,
}

const navLink = { color: '#8B95A5', fontWeight: 500, transition: 'color 0.2s', cursor: 'pointer' }

const ctaBtn = {
  background: '#3B82F6', color: '#fff', fontWeight: 700,
  padding: '10px 22px', borderRadius: 10, fontSize: 14,
  transition: 'opacity 0.2s', cursor: 'pointer',
}

const heroCta = {
  background: '#3B82F6', color: '#fff', fontWeight: 700,
  padding: '16px 36px', borderRadius: 14, fontSize: 16, cursor: 'pointer',
}

const heroSec = {
  background: 'transparent', color: '#8B95A5', fontWeight: 600,
  padding: '16px 24px', borderRadius: 14, fontSize: 15, cursor: 'pointer',
  border: '1px solid rgba(255,255,255,0.10)',
}

const featureCard = {
  background: '#111318', border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 16, padding: '28px 24px',
}

const catPill = {
  display: 'flex', alignItems: 'center', gap: 7,
  background: '#111318', border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 999, padding: '9px 18px', fontSize: 14, color: '#D1D5DB',
}
