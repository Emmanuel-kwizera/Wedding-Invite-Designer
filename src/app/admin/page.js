import { prisma } from "../../lib/prisma";
import { deleteInvite } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const invitations = await prisma.invitation.findMany({
    orderBy: { createdAt: 'desc' },
    include: { guests: true }
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 1rem' }} className="fade-in">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Admin Dashboard</h2>
      
      <div className="glass-card fade-in delay-1">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>All Invitations</h3>
        
        {invitations.length === 0 ? (
          <p style={{ color: 'var(--text-light)' }}>No events created yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Couple Names</th>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Date & Time</th>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Location</th>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>RSVPs</th>
                  <th style={{ padding: '1rem', color: 'var(--text-light)', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((invite) => (
                  <tr key={invite.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem' }}>
                      <a href={`/invite/${invite.id}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>
                        {invite.coupleNames}
                      </a>
                    </td>
                    <td style={{ padding: '1rem' }}>{new Date(invite.date).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute:'2-digit'
                    })}</td>
                    <td style={{ padding: '1rem' }}>{invite.location}</td>
                    <td style={{ padding: '1rem' }}>{invite.guests.length}</td>
                    <td style={{ padding: '1rem' }}>
                      <form action={deleteInvite.bind(null, invite.id)}>
                        <button type="submit" style={{ 
                          background: 'rgba(255, 77, 79, 0.1)', 
                          color: '#ff4d4f', 
                          border: '1px solid currentColor', 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '4px', 
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'all 0.2s'
                        }}>
                          Delete
                        </button>
                      </form>
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
