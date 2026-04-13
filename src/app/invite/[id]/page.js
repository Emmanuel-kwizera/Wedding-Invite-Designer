import { prisma } from "../../../lib/prisma";
import { submitRsvp } from "../../actions";

export default async function GuestInviteView({ params, searchParams }) {
  const { id } = await params;
  const { success } = await searchParams; // Check if RSVP was successfully submitted

  // Wait, in Next.js 15 searchParams is a sync/async mix. await searchParams is safe.
  
  const invite = await prisma.invitation.findUnique({
    where: { id }
  });

  if (!invite) {
    return (
      <div style={{ textAlign: 'center', padding: '10vh 2rem' }}>
        <h2>Invitation Not Found</h2>
        <p style={{ color: 'var(--text-light)', marginTop: '1rem' }}>It seems this link is broken or the invitation was removed.</p>
      </div>
    );
  }

  const dateStr = new Date(invite.date).toLocaleDateString(undefined, { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0' }} className="fade-in">
      
      {/* Hero Section */}
      <div style={{ 
        height: '40vh', 
        minHeight: '300px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80) center/cover',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '4rem', color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          {invite.coupleNames}
        </h1>
      </div>

      <div style={{ padding: '3rem 2rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div className="glass-card" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            You are invited
          </h3>
          
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            {invite.message || "We would be honored to have you join us for our special day."}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>When</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{dateStr}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Where</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{invite.location}</p>
            </div>
          </div>
        </div>

        {/* RSVP Form Section */}
        <div className="glass-card fade-in delay-1" id="rsvp">
          {success ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Thank You!</h3>
              <p>Your RSVP has been successfully received.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>RSVP</h3>
              <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '2rem' }}>Please let us know if you can make it.</p>
              
              <form action={submitRsvp}>
                <input type="hidden" name="invitationId" value={invite.id} />
                
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    className="form-input" 
                    placeholder="e.g. Jane Doe" 
                    required 
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <label style={{ flex: 1, cursor: 'pointer', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px', textAlign: 'center', background: 'var(--glass-bg)' }}>
                    <input type="radio" name="attending" value="yes" required style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontWeight: 500 }}>Joyfully Accept</span>
                  </label>
                  <label style={{ flex: 1, cursor: 'pointer', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px', textAlign: 'center', background: 'var(--glass-bg)' }}>
                    <input type="radio" name="attending" value="no" required style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontWeight: 500 }}>Regretfully Decline</span>
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="note">Message to the couple (Optional)</label>
                  <textarea 
                    id="note"
                    name="note" 
                    className="form-input" 
                    rows="3"
                    placeholder="Any dietary restrictions, well wishes, or a song request?" 
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Send RSVP
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
