import React from 'react';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import { getApiUrl } from '../config';
import { useAuthenticatedApi } from '../hooks/useAuthenticatedApi';
import { useUserData } from '../hooks/useSession';

function PlayPage() {
  const { userData, getUserId, updateSessionExpiry, checkSessionFresh } = useUserData();
  const makeAuthenticatedApiCall = useAuthenticatedApi();
  const [userDataFromApi, setUserDataFromApi] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [inputUserId, setInputUserId] = React.useState('1');
  
  // New state for the new API calling mechanism demo
  const [newApiLoading, setNewApiLoading] = React.useState(false);
  const [newApiError, setNewApiError] = React.useState(null);
  const [allUsersData, setAllUsersData] = React.useState(null);

  const fetchUserDataById = async (idToFetch) => {
    const id = idToFetch || inputUserId;
    if (!id.trim()) {
      setError('Please enter a user ID');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setUserDataFromApi(null);
      
      // Use the authenticated API call hook
      const response = await makeAuthenticatedApiCall(
        getApiUrl(`user?user_id=${id.trim()}`),
        { method: 'GET' }
      );
      
      if (!response.ok) {
        let errorDetails = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && (errorData.error || errorData.message)) {
            errorDetails = `HTTP ${response.status}: ${errorData.error || errorData.message}`;
          }
        } catch (parseError) {
          console.log('[DEBUG] Could not parse error response:', parseError);
        }
        throw new Error(errorDetails);
      }
      
      const data = await response.json();
      let user = data;
      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error('HTTP 404: No users found for this ID.');
        }
        user = data[0];
      }
      if (!user || typeof user !== 'object') {
        throw new Error('Invalid response format: expected user object');
      }
      const requiredFields = ['username', 'full_name', 'role', 'created_at'];
      const missingFields = requiredFields.filter(field => !user[field]);
      if (missingFields.length > 0) {
        throw new Error(`Invalid user data: missing fields: ${missingFields.join(', ')}`);
      }
      setUserDataFromApi(user);
    } catch (err) {
      console.error('[DEBUG] Error fetching user data:', err);
      let errorMessage = 'An error occurred while fetching user data';
      if (err.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Network error. Please check if the API server is running.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = () => fetchUserDataById();

  const handleUserIdChange = (e) => {
    setInputUserId(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
    // Extend session on user interaction
    updateSessionExpiry();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      fetchUserData();
    }
    // Extend session on user interaction
    updateSessionExpiry();
  };

  // New function to fetch current user from session data
  const fetchMyUserData = async () => {
    try {
      if (!userData?.id) {
        setError('No current user found in session.');
        return;
      }
      setInputUserId(userData.id); // Update the input field
      await fetchUserDataById(userData.id);
    } catch (err) {
      setError('Failed to fetch current user from session.');
    }
  };

  // New function to demonstrate the new API calling mechanism
  const fetchAllUsersWithNewMethod = async () => {
    try {
      setNewApiLoading(true);
      setNewApiError(null);
      setAllUsersData(null);
      
      // Extend session on API call
      updateSessionExpiry();
      
      // Use the new authenticated API call hook
      const response = await makeAuthenticatedApiCall(
        getApiUrl('user'),
        { method: 'GET' }
      );
      
      if (!response.ok) {
        let errorDetails = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && (errorData.error || errorData.message)) {
            errorDetails = `HTTP ${response.status}: ${errorData.error || errorData.message}`;
          }
        } catch (parseError) {
          console.log('[DEBUG] Could not parse error response:', parseError);
        }
        throw new Error(errorDetails);
      }
      
      const data = await response.json();
      console.log('[DEBUG] Received all users data:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected array of users');
      }
      
      setAllUsersData(data);
    } catch (err) {
      console.error('[DEBUG] Error fetching all users:', err);
      let errorMessage = 'An error occurred while fetching users';
      if (err.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Network error. Please check if the API server is running.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setNewApiError(errorMessage);
    } finally {
      setNewApiLoading(false);
    }
  };

  // Get current session status for display
  const currentSessionStatus = checkSessionFresh();

  return (
    <div className="main-page-container">
      {/* Session Status Display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text variant="h3">Session Management Demo</Text>
        
        {userData && (
          <div style={{ 
            padding: 16, 
            backgroundColor: currentSessionStatus.isValid ? 'var(--success-50)' : 'var(--error-50)', 
            border: `1px solid ${currentSessionStatus.isValid ? 'var(--success-200)' : 'var(--error-200)'}`, 
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}>
            <Text variant="body1" style={{ fontWeight: 600, color: currentSessionStatus.isValid ? 'var(--success-700)' : 'var(--error-700)' }}>
              Current Session Status: {currentSessionStatus.isValid ? 'Valid' : 'Expired'}
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Text variant="body1"><strong>Username:</strong> {userData.username}</Text>
              <Text variant="body1"><strong>Role:</strong> {userData.role}</Text>
              <Text variant="body1"><strong>Session Expires:</strong> {new Date(userData.expiry).toLocaleString()}</Text>
              
              {/* Display all additional userData fields */}
              {userData.id && (
                <Text variant="body1"><strong>ID:</strong> {userData.id}</Text>
              )}
              {userData.first_name && (
                <Text variant="body1"><strong>First Name:</strong> {userData.first_name}</Text>
              )}
              {userData.last_name && (
                <Text variant="body1"><strong>Last Name:</strong> {userData.last_name}</Text>
              )}
              {userData.industry && (
                <Text variant="body1"><strong>Industry:</strong> {userData.industry}</Text>
              )}
              {userData.business && (
                <Text variant="body1"><strong>Business:</strong> {userData.business}</Text>
              )}
              {userData.tone_guide && (
                <div style={{ marginTop: 8 }}>
                  <Text variant="body1" style={{ fontWeight: 600, marginBottom: 4 }}>Tone Guide:</Text>
                  <Text variant="body2" style={{ 
                    padding: 8, 
                    backgroundColor: 'var(--neutral-50)', 
                    borderRadius: 4,
                    border: '1px solid var(--neutral-200)',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '150px',
                    overflow: 'auto'
                  }}>
                    {userData.tone_guide}
                  </Text>
                </div>
              )}
              {userData.topics && userData.topics.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <Text variant="body1" style={{ fontWeight: 600, marginBottom: 4 }}>Topics ({userData.topics.length}):</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {userData.topics.map((topic, index) => (
                      <div key={index} style={{ 
                        padding: 6, 
                        backgroundColor: 'var(--neutral-50)', 
                        borderRadius: 4,
                        border: '1px solid var(--neutral-200)'
                      }}>
                        <Text variant="body2">
                          <strong>{topic.type}:</strong> {topic.topic}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {userData.pro_tips && userData.pro_tips.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <Text variant="body1" style={{ fontWeight: 600, marginBottom: 4 }}>Pro Tips ({userData.pro_tips.length}):</Text>
                  <div style={{ 
                    maxHeight: '200px', 
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                  }}>
                    {userData.pro_tips.map((tip, index) => (
                      <div key={index} style={{ 
                        padding: 6, 
                        backgroundColor: 'var(--neutral-50)', 
                        borderRadius: 4,
                        border: '1px solid var(--neutral-200)'
                      }}>
                        <Text variant="body2">
                          <strong>{index + 1}.</strong> {tip}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* New API Calling Mechanism Demo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text variant="h3">New Authenticated API Call Demo</Text>
        <Text variant="body2" style={{ color: 'var(--neutral-600)' }}>
          This demonstrates the new useAuthenticatedApi hook that automatically:
          <br />• Validates session before making the call
          <br />• Attaches user_id parameter automatically
          <br />• Handles session extension
        </Text>
        
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <Button 
            onClick={fetchAllUsersWithNewMethod} 
            disabled={newApiLoading || !currentSessionStatus.isValid}
            style={{ background: 'var(--primary-600)' }}
          >
            {newApiLoading ? 'Loading...' : 'Call An API'}
          </Button>
        </div>
        
        {newApiError && (
          <div style={{ 
            padding: 12, 
            backgroundColor: 'var(--error-50)', 
            border: '1px solid var(--error-200)', 
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}>
            <Text variant="body1" style={{ color: 'var(--error-700)', fontWeight: 600 }}>
              Error
            </Text>
            <Text variant="body1" style={{ color: 'var(--error-600)' }}>
              {newApiError}
            </Text>
          </div>
        )}
        
        {allUsersData && (
          <div style={{ 
            padding: 16, 
            backgroundColor: 'var(--success-50)', 
            border: '1px solid var(--success-200)', 
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}>
            <Text variant="body1" style={{ fontWeight: 600, color: 'var(--success-700)' }}>
              All Users Retrieved Successfully ({allUsersData.length} users)
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {allUsersData.map((user, index) => (
                <div key={user.id} style={{ 
                  padding: 8, 
                  backgroundColor: 'var(--neutral-50)', 
                  borderRadius: 4,
                  border: '1px solid var(--neutral-200)'
                }}>
                  <Text variant="body2">
                    <strong>{index + 1}.</strong> {user.username} - {user.full_name} ({user.role})
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayPage; 