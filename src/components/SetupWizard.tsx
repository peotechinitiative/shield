import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  hashPIN,
  storeHashedPIN,
  validatePIN,
  markSetupComplete,
  storeTrustedContacts,
  storeChosenName,
  TrustedContact
} from '../utils/security';

const SetupWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [chosenName, setChosenName] = useState('');
  const [currentContact, setCurrentContact] = useState<Partial<TrustedContact>>({});

  // ── STEP 2: CREATE PIN ──
  const handleCreatePIN = () => {
    const validation = validatePIN(pin);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setError('');
    setStep(3);
  };

  // ── STEP 3: CONFIRM PIN ──
  const handleConfirmPIN = async () => {
    if (pin !== confirmPin) {
      setError('PINs do not match. Please try again.');
      return;
    }
    const { hash, salt } = await hashPIN(pin);
    storeHashedPIN(hash, salt);
    setError('');
    setStep(4);
  };

  // ── STEP 4: ADD TRUSTED CONTACTS ──
  const handleAddContact = () => {
    if (!currentContact.name || !currentContact.phoneNumber) {
      setError('Name and phone number are required');
      return;
    }
    const newContact: TrustedContact = {
      id: Date.now().toString(),
      name: currentContact.name,
      phoneNumber: currentContact.phoneNumber,
      relationship: currentContact.relationship,
      preferredMethod: currentContact.preferredMethod || 'sms'
    };
    setContacts([...contacts, newContact]);
    setCurrentContact({});
    setError('');
    
    if (contacts.length >= 2) {
      setStep(5); // Move to next step after 3 contacts
    }
  };

  // ── STEP 5: CHOSEN NAME ──
  const handleChosenName = () => {
    if (!chosenName.trim()) {
      setError('Please enter a name');
      return;
    }
    storeChosenName(chosenName);
    storeTrustedContacts(contacts);
    markSetupComplete();
    setError('');
    setStep(6);
  };

  // ── RENDER ──
  return (
    <div className="setup-wizard" style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      color: '#fff',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Progress Bar */}
      <div style={{ width: '100%', maxWidth: '400px', marginBottom: '32px' }}>
        <div style={{ 
          height: '4px', 
          background: '#333', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(step / 6) * 100}%`,
            height: '100%',
            background: '#2E86AB',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <p style={{ textAlign: 'center', marginTop: '8px', color: '#888', fontSize: '12px' }}>
          Step {step} of 6
        </p>
      </div>

      {/* STEP 1: WELCOME */}
      {step === 1 && (
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
          <h2 style={{ marginBottom: '16px' }}>Welcome to Shield</h2>
          <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '24px' }}>
            Let's set up your protection. This will take about 2 minutes.
            Your data stays on this device — we never see your PIN.
          </p>
          <button 
            onClick={() => setStep(2)}
            style={{
              padding: '14px 32px',
              background: '#2E86AB',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Get Started
          </button>
        </div>
      )}

      {/* STEP 2: CREATE PIN */}
      {step === 2 && (
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '8px' }}>Create Your Secret PIN</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
            This replaces the default code. Only you will know it.
          </p>
          
          <div style={{ 
            background: '#16213e', 
            padding: '20px', 
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter secret code"
              style={{
                width: '100%',
                padding: '14px',
                background: '#0f3460',
                border: '1px solid #2E86AB',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '18px',
                textAlign: 'center',
                letterSpacing: '4px'
              }}
            />
          </div>

          {error && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

          <div style={{ background: '#16213e', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>PIN Requirements:</p>
            <ul style={{ fontSize: '12px', color: '#aaa', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li style={{ color: pin.length >= 6 ? '#2ecc71' : '#aaa' }}>6-12 keystrokes</li>
              <li style={{ color: /[+\-×÷=]/.test(pin) ? '#2ecc71' : '#aaa' }}>Include an operator (+, -, ×, ÷, =)</li>
              <li style={{ color: !/^(.)+$/.test(pin) && pin.length > 0 ? '#2ecc71' : '#aaa' }}>Not all same digit</li>
              <li style={{ color: !/^(012|123|234|345|456|567|678|789|890)/.test(pin) ? '#2ecc71' : '#aaa' }}>Not sequential</li>
              <li style={{ color: pin !== '2-4-6-8-=-=' ? '#2ecc71' : '#e74c3c' }}>Not the default code</li>
            </ul>
          </div>

          <button 
            onClick={handleCreatePIN}
            style={{
              padding: '14px 32px',
              background: '#2E86AB',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 3: CONFIRM PIN */}
      {step === 3 && (
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '8px' }}>Confirm Your PIN</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
            Enter it again to make sure you remember it.
          </p>
          
          <div style={{ 
            background: '#16213e', 
            padding: '20px', 
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="Enter code again"
              style={{
                width: '100%',
                padding: '14px',
                background: '#0f3460',
                border: '1px solid #2E86AB',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '18px',
                textAlign: 'center',
                letterSpacing: '4px'
              }}
            />
          </div>

          {error && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

          <button 
            onClick={handleConfirmPIN}
            style={{
              padding: '14px 32px',
              background: '#2E86AB',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Confirm PIN
          </button>
        </div>
      )}

      {/* STEP 4: TRUSTED CONTACTS */}
      {step === 4 && (
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '8px' }}>Trusted Contacts</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
            Add 3-5 people who will receive your emergency alerts.
          </p>

          {contacts.map(c => (
            <div key={c.id} style={{ 
              background: '#16213e', 
              padding: '12px', 
              borderRadius: '8px',
              marginBottom: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{c.name}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{c.phoneNumber}</p>
              </div>
              <span style={{ fontSize: '12px', color: '#2E86AB' }}>{c.preferredMethod}</span>
            </div>
          ))}

          {contacts.length < 5 && (
            <div style={{ 
              background: '#16213e', 
              padding: '16px', 
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <input
                placeholder="Contact name"
                value={currentContact.name || ''}
                onChange={(e) => setCurrentContact({...currentContact, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#0f3460',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '8px'
                }}
              />
              <input
                placeholder="Phone number"
                value={currentContact.phoneNumber || ''}
                onChange={(e) => setCurrentContact({...currentContact, phoneNumber: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#0f3460',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '8px'
                }}
              />
              <select
                value={currentContact.preferredMethod || 'sms'}
                onChange={(e) => setCurrentContact({...currentContact, preferredMethod: e.target.value as any})}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#0f3460',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#fff',
                  marginBottom: '8px'
                }}
              >
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="signal">Signal</option>
              </select>
              <button 
                onClick={handleAddContact}
                style={{
                  padding: '10px',
                  background: '#28A745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Add Contact ({contacts.length}/5)
              </button>
            </div>
          )}

          {error && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

          {contacts.length >= 2 && (
            <button 
              onClick={() => setStep(5)}
              style={{
                padding: '14px 32px',
                background: '#2E86AB',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Continue ({contacts.length} contacts added)
            </button>
          )}
        </div>
      )}

      {/* STEP 5: CHOSEN NAME */}
      {step === 5 && (
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '8px' }}>Your Chosen Name</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
            What name should alerts use for you? This can be different from your legal name.
          </p>
          
          <div style={{ 
            background: '#16213e', 
            padding: '20px', 
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <input
              type="text"
              value={chosenName}
              onChange={(e) => setChosenName(e.target.value)}
              placeholder="Enter your chosen name"
              style={{
                width: '100%',
                padding: '14px',
                background: '#0f3460',
                border: '1px solid #2E86AB',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
          </div>

          {error && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

          <button 
            onClick={handleChosenName}
            style={{
              padding: '14px 32px',
              background: '#2E86AB',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Complete Setup
          </button>
        </div>
      )}

      {/* STEP 6: COMPLETE */}
      {step === 6 && (
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ marginBottom: '16px' }}>You're Protected!</h2>
          
          <div style={{ background: '#16213e', padding: '20px', borderRadius: '12px', marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ color: '#2ecc71', fontWeight: 'bold', marginBottom: '12px' }}>✓ Setup Complete</p>
            <ul style={{ color: '#aaa', fontSize: '14px', lineHeight: '2', paddingLeft: '20px' }}>
              <li>Your custom PIN is saved</li>
              <li>{contacts.length} trusted contacts added</li>
              <li>Alerts will use name: <strong style={{ color: '#fff' }}>{chosenName}</strong></li>
              <li>Default PIN (2-4-6-8-=-=) is now disabled</li>
            </ul>
          </div>

          <div style={{ background: '#C73E1D', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
            <p style={{ color: '#fff', fontSize: '13px', margin: 0, fontWeight: 'bold' }}>
              ⚠️ Remember: If you forget your PIN, you must reinstall the app. We cannot recover it.
            </p>
          </div>

          <button 
            onClick={() => navigate('/calculator')}
            style={{
              padding: '14px 32px',
              background: '#28A745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Open Shield App
          </button>
        </div>
      )}

    </div>
  );
};

export default SetupWizard;