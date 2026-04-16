import Link from 'next/link';
import { getBaseUrl } from '../lib/utils';

export default function Home() {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }} className="fade-in">
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
        Forever Starts Here.
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', maxWidth: '600px', marginBottom: '3rem', marginInline: 'auto' }} className="fade-in delay-1">
        Design a breathtaking, personalized digital wedding invitation. Instantly generate a shareable link and seamlessly manage your guest RSVPs all in one beautiful place.
      </p>
      
      <div className="glass-card fade-in delay-2" style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Ready to invite your guests?</h3>
        <Link href={`${getBaseUrl()}/create`}>
          <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
            Create Your Invitation
          </button>
        </Link>
        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
           Free forever. No credit card required.
        </p>
      </div>
    </div>
  );
}
