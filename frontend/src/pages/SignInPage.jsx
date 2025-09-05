import React, { useState } from "react";
import Text from "../components/Text";
import Button from "../components/Button";
import Input from "../components/Input";
import SegmentedControl from "../components/SegmentedControl";
import { getCurrentYear, TAGLINE } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { UsersThree, Ticket } from "phosphor-react";

function SignInPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Default to signup unless explicitly coming from Sign In button
  const [tab, setTab] = useState(location.state?.tab || "signup");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        background: "var(--neutral-50)",
        borderRadius: 16,
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.21)",
        padding: "2.5rem 2rem 1.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.svg" alt="ScribeMate Logo" style={{ width: 32, height: 32 }} />
          <Text variant="h4" style={{ 
            color: "var(--primary-light)",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "36px"
          }}>
            ScribeMate
          </Text>
        </div>
        <Text variant="body2" style={{ marginTop: -16, marginBottom: 0, color: "#b0b0b0" }}>
          {TAGLINE}
        </Text>
        <SegmentedControl
          options={[{ label: "Sign In", value: "signin" }, { label: "Sign Up", value: "signup" }]}
          value={tab}
          onChange={setTab}
          style={{ width: "100%", marginBottom: 16 }}
        />
        {tab === "signin" ? (
          // sign in form
          <form style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Email" placeholder="your@email.com" type="email" required />
            <Input label="Password" placeholder="Password" type="password" required />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <a href="#" style={{ color: "var(--primary-400)", fontSize: 13, textDecoration: "none" }}>Forgot password?</a>
            </div>
            <div style={{ display: "flex", gap: 8, width: "100%" }}>
              <Button
                size="md"
                color="grey"
                variant="outlined"
                style={{ flex: 1 }}
                onClick={e => { e.preventDefault(); navigate("/"); }}
              >
                Cancel
              </Button>
              <Button size="md" style={{ flex: 1 }} type="submit">Sign In</Button>
            </div>
          </form>
        ) : (
          // sign up form
          <>
            <Text variant="h5" style={{ 
              fontSize: "20px", 
              fontWeight: 600, 
              textAlign: "center" 
            }}>
              Join the accountability movement
            </Text>
            <Text variant="muted1" style={{ 
              marginTop: -16, 
              marginBottom: 8, 
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 400,
              color: "var(--neutral-600)"
            }}>
              {TAGLINE}
            </Text>
            <form style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
              <Input label="Full Name" placeholder="John Doe" type="text" required />
              <Input label="Email" placeholder="your@email.com" type="email" required />
              <Input label="Password" placeholder="Password" type="password" required />
              <Input label="Confirm Password" placeholder="Confirm your password" type="password" required />
              <div style={{ background: "#232B36", borderRadius: 8, padding: "16px", display: "flex", gap: 12, marginBottom: 4 }}>
                <div style={{ alignSelf: "flex-start" }}>
                  <UsersThree size={24} weight="fill" color="var(--primary-500)" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text variant="h6" style={{ marginBottom: 8 }}>Ready to commit?</Text>
                  <Text variant="muted1" style={{ fontSize: 13, lineHeight: 1.5 }}>
                    You'll be able to create or join a group after signing up. Remember: consistency beats perfection!
                  </Text>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                <Button
                  size="md"
                  color="grey"
                  variant="outlined"
                  style={{ flex: 1 }}
                  onClick={e => { e.preventDefault(); navigate("/"); }}
                >
                  Cancel
                </Button>
                <Button size="sm" style={{ flex: 1 }} type="submit">Create Account</Button>
              </div>
            </form>
            {/* Invite Code Section */}
            <div style={{ marginTop: 16, width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                <div style={{ flex: 1, height: 1, background: "var(--neutral-800)" }} />
                <Text variant="muted1" style={{ fontSize: 14 }}>or</Text>
                <div style={{ flex: 1, height: 1, background: "var(--neutral-800)" }} />
              </div>
              <div style={{ marginBottom: 8, width: "100%" }}>
                <Text variant="muted1" style={{ marginBottom: 12 }}>Invite Code</Text>
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    className="ff-input"
                    placeholder="Enter invite code"
                    style={{ paddingRight: 40 }}
                  />
                  <Ticket size={20} color="#8B96A5" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", opacity: 0.7 }} />
                </div>
                <Text variant="muted2" style={{ fontSize: 13, marginTop: 6 }}>
                  Have an invite code? Enter it to join an existing group
                </Text>
              </div>
            </div>
          </>
        )}
        <Text variant="muted2" style={{ fontSize: 12, textAlign: "center", marginTop: 8 }}>
          © {getCurrentYear()} ScribeMate. All rights reserved.
        </Text>
      </div>
    </div>
  );
}

export default SignInPage; 