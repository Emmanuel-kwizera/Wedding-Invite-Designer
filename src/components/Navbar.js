import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--glass-border)',
      padding: '1rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }}>
            Aura
          </span>
        </Link>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500, fontSize: '0.95rem' }}>
            Home
          </Link>
          <Link href="/events" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 500, fontSize: '0.95rem' }}>
            Events
          </Link>
          <Link href="/create">
            <button className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
              Create Invite
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
