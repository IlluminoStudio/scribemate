import React, { useState, useEffect } from "react";
import { ArrowLeft, PaperPlaneRight, Info } from "phosphor-react";
import Text from "../components/Text";
import SegmentedControl from "../components/SegmentedControl";
import Button from "../components/Button";
import MessagePreview from "./MessagePreview";
import InputBox from "../components/InputBox";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import "../styles/NewMessage.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useSession";
import { useMessage } from "../hooks/useMessage";
import { useUser } from "../hooks/useUser";

function NewMessageForm() {
  const [message, setMessage] = useState("");
  const [messageHeading, setMessageHeading] = useState("");
  const [messageType, setMessageType] = useState("private");
  const [selectedCarers, setSelectedCarers] = useState([]);
  const navigate = useNavigate();
  const { checkSessionBeforeApiCall, getUserId } = useUserData();
  const { sendMessage } = useMessage();
  const { getCarers, loading: usersLoading, error: usersError } = useUser();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Transform carers data for dropdown
  const allCarers = getCarers().map(carer => ({ id: carer.id, full_name: carer.full_name }));
  const carersLoading = usersLoading;

  // Extract initials from selected carer names
  const getCarerInitials = (carerNames) => {
    return carerNames.map((name) => {
      const parts = name.split(' ');
      return parts.map((part) => part.charAt(0)).join('').toUpperCase();
    });
  };

  const handleSend = async () => {
    setFeedback({ type: '', message: '' });
    setLoading(true);
    try {
      // Check session and get user
      const user = checkSessionBeforeApiCall();
      const userId = user.id || getUserId();
      if (messageType === "broadcast") {
        await sendMessage({
          title: messageHeading,
          body: message,
          is_broadcast: true
        });
        setFeedback({ type: 'success', message: 'Message sent successfully!' });
        setMessage("");
        setMessageHeading("");
        setSelectedCarers([]);
      } else {
        // Private message logic
        if (!selectedCarers.length) {
          setFeedback({ type: 'error', message: 'Please select at least one carer.' });
          setLoading(false);
          return;
        }
        // Map selected carer names to UUIDs
        const selectedCarerIds = allCarers
          .filter(c => selectedCarers.includes(c.full_name))
          .map(c => c.id);
        await sendMessage({
          title: messageHeading,
          body: message,
          is_broadcast: false,
          carer_id: selectedCarerIds // array of UUIDs
        });
        setFeedback({ type: 'success', message: 'Message sent successfully!' });
        setMessage("");
        setMessageHeading("");
        setSelectedCarers([]);
      }
    } catch (err) {
      const errorMessage = err.message || err.toString() || "Unknown error occurred";
      setFeedback({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-page-container">
      <div className="new-message-header">
        <ArrowLeft size={24} color="var(--primary-500)" style={{ cursor: "pointer" }} onClick={() => navigate('/coordinator')} />
        <div>
          <Text variant="h4">
            New {messageType === "broadcast" ? "Broadcast" : "Private"} Message
          </Text>
        </div>
      </div>

      <div className="card">
        <Text variant="h5" className="card-title-text">
          Message Type
        </Text>
        <SegmentedControl
          name="messageType"
          options={[
            { label: "Broadcast", value: "broadcast" },
            { label: "Private", value: "private" },
          ]}
          value={messageType}
          onChange={setMessageType}
        />
      </div>

      <div className="card">
        <Text variant="h5" className="card-title-text">
          Message Content
        </Text>
        <Input
          placeholder="Type your message heading here..."
          label="Message Heading"
          value={messageHeading}
          onChange={(e) => setMessageHeading(e.target.value)}
        />
        <InputBox
          placeholder="Type your message here..."
          label="Message Body"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {messageType === "private" && (
        <div className="card">
          <Text variant="h5" className="card-title-text">
            Select Carers
          </Text>
          {carersLoading ? (
            <Text variant="muted1" style={{ color: "var(--neutral-600)" }}>
              Loading carers...
            </Text>
          ) : (
            <Dropdown
              options={allCarers.map(c => c.full_name)}
              selected={selectedCarers}
              onChange={setSelectedCarers}
              placeholder="Select carers..."
              multiple={true}
            />
          )}
        </div>
      )}

      <div className="card">
        <Text variant="h5" className="card-title-text">
          Message Preview
        </Text>
        <MessagePreview
          messageHeading={messageHeading || "Message Heading"}
          messageBody={message}
          type={messageType}
          carers={getCarerInitials(selectedCarers)}
        />
      </div>

      <div className="ack-box">
        <Info size={20} color="var(--primary-700)" />
        <div>
          <Text variant="h6">Message Acknowledgement</Text>
          <Text
            variant="muted1"
            style={{ color: "var(--neutral-600)", marginTop: 4 }}
          >
            Recipients will be required to acknowledge this message. This is a
            one-way communication and replies are not permitted.
          </Text>
        </div>
      </div>

      <div className="actions-footer" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Feedback message to the left of the button group */}
        {feedback.message && (
          <div style={{ minWidth: 180, textAlign: 'left' }}>
            <Text
              variant="muted1"
              style={{
                color: feedback.type === 'success' ? 'var(--success-500)' : 'var(--error-500)',
                fontWeight: 500,
                marginRight: 16
              }}
            >
              {feedback.message}
            </Text>
          </div>
        )}
        <Button variant="outlined" onClick={() => navigate('/coordinator')}>Cancel</Button>
        <Button
          variant="primary"
          onClick={handleSend}
          disabled={loading ||
            !messageHeading.trim() ||
            !message.trim() ||
            (messageType === 'private' && selectedCarers.length === 0)
          }
        >
          <PaperPlaneRight size={16} />
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </div>
  );
}

export default NewMessageForm;
