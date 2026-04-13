import { createInvite } from "../actions";

export default function CreateInvite() {
  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }} className="fade-in">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Design Your Invite</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '2rem' }}>
        Fill in the details below. We'll generate a beautiful invitation and a unique link for your guests to RSVP.
      </p>

      <form action={createInvite} className="glass-card fade-in delay-1">
        <div className="form-group">
          <label className="form-label" htmlFor="coupleNames">Couple's Names</label>
          <input 
            type="text" 
            id="coupleNames"
            name="coupleNames" 
            className="form-input" 
            placeholder="e.g. Alex & Sam" 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date">Date & Time</label>
          <input 
            type="datetime-local" 
            id="date"
            name="date" 
            className="form-input" 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="location">Venue / Location</label>
          <input 
            type="text" 
            id="location"
            name="location" 
            className="form-input" 
            placeholder="e.g. The Grand Hotel, Paris" 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">Welcome Message (Optional)</label>
          <textarea 
            id="message"
            name="message" 
            className="form-input" 
            rows="4"
            placeholder="A short note to your guests..." 
          ></textarea>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Generate Invitation Link
        </button>
      </form>
    </div>
  );
}
