import { prisma } from "../../../lib/prisma";
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function Dashboard({ params }) {
  const { id } = await params;
  
  const invite = await prisma.invitation.findUnique({
    where: { id },
    include: { guests: { orderBy: { createdAt: 'desc' } } }
  });

  if (!invite) {
    return <div style={{textAlign: "center", padding: "4rem"}}>Invitation not found!</div>;
  }

  const attendingCount = invite.guests.filter((g) => g.attending).length;
  const declinedCount = invite.guests.filter((g) => !g.attending).length;

  // Getting domain safely depending on prod vercel or localhost
  const appUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000");

  return (
    <div style={{ maxWidth: '900px', margin: '4rem auto', padding: '0 1rem' }} className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>{invite.coupleNames}'s Wedding</h2>
          <p style={{ color: 'var(--text-light)' }}>Dashboard</p>
        </div>
        <Link href={`/invite/${invite.id}`}>
          <button className="btn-secondary">Preview Invitation</button>
        </Link>
      </div>

      <div className="glass-card fade-in delay-1" style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Your Shareable Guest Link</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            className="form-input" 
            readOnly 
            value={`${appUrl}/invite/${invite.id}`} 
            style={{ margin: 0, opacity: 0.8 }}
          />
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
          Copy this link and send it to your guests so they can RSVP.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }} className="fade-in delay-2">
        <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{attendingCount}</h3>
          <p style={{ color: 'var(--text-light)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Attending</p>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{declinedCount}</h3>
          <p style={{ color: 'var(--text-light)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Declined</p>
        </div>
      </div>

      <div className="glass-card fade-in delay-3">
        <h4 style={{ marginBottom: '1rem' }}>Guest List</h4>
        {invite.guests.length === 0 ? (
          <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>No RSVPs yet. Share your link to get started!</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Note</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {invite.guests.map(guest => (
                  <tr key={guest.id}>
                    <td style={{ fontWeight: 500 }}>{guest.name}</td>
                    <td>
                      <span className={`status-badge ${guest.attending ? 'status-attending' : 'status-declined'}`}>
                        {guest.attending ? 'Attending' : 'Declined'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{guest.note || '-'}</td>
                    <td style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                      {new Date(guest.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
