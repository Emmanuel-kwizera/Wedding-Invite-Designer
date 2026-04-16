import { prisma } from "../../lib/prisma";
import Link from 'next/link';
import { getBaseUrl } from '../../lib/utils';

export default async function EventsList() {
  // Fetch all invitations, ordering by the most recently created
  const invites = await prisma.invitation.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { guests: true }
      }
    }
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 1rem' }} className="fade-in">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Previous Events</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '3rem' }}>
        Select an event to view its RSVP dashboard or preview the invitation link.
      </p>

      {invites.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-light)' }}>No events have been created yet.</p>
          <Link href={`${getBaseUrl()}/create`}>
            <button className="btn-primary" style={{ marginTop: '1.5rem' }}>Create the first one</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {invites.map((invite, idx) => (
            <div key={invite.id} className={`glass-card fade-in`} style={{ animationDelay: `${(idx % 5) * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                {invite.coupleNames}
              </h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                <strong>Date:</strong> {new Date(invite.date).toLocaleDateString()}
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                <strong>Location:</strong> {invite.location}
              </p>
              <p style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                {invite._count.guests} guests have RSVP'd
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <Link href={`${getBaseUrl()}/dashboard/${invite.id}`} style={{ flex: 1 }}>
                  <button className="btn-primary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}>
                    View RSVPs
                  </button>
                </Link>
                <Link href={`${getBaseUrl()}/invite/${invite.id}`} style={{ flex: 1 }}>
                  <button className="btn-secondary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}>
                    Invitation
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
