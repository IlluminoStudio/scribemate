import React from "react";
import "../styles/App.css";

import { TAGLINE, APP_NAME } from "../constants";
import ColorSwitcher from "../ColorSwatch";
import Button from "../components/Button";
import Text from "../components/Text";
import Icon from "../components/Icon";
import Card from "../components/Card";
import Input from "../components/Input";
import SegmentedControl from "../components/SegmentedControl";
import Stepper from "../components/Stepper";
import Avatar from "../components/Avatar";
import Chip from "../components/Chip";
import InputBox from "../components/InputBox";
import Dott from "../components/Dott";
import Toggle from "../components/Toggle";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import Dropdown from "../components/Dropdown";
import { X, Bell, UsersThree, Trophy, Rocket, Flame, Cursor, Users, MagnifyingGlass, Calendar, Check, Folder } from "phosphor-react";
import userSvg from "../assets/user.svg";

function DemoPage() {
  const [mode, setMode] = React.useState("medium");
  const [isToggleOn, setIsToggleOn] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsReminders, setSmsReminders] = React.useState(false);
  const [deliveryTime, setDeliveryTime] = React.useState("morning");
  const [selectedSpecialties, setSelectedSpecialties] = React.useState([
    "Cardiology",
    "Neurology",
  ]);
  const [selectedDoctor, setSelectedDoctor] = React.useState([]);

  const allSpecialties = [
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
  ];
  const allDoctors = ["Dr. Smith", "Dr. Jones", "Dr. Miller", "Dr. Brown"];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <header>
        <img 
          src="/logo.svg" 
          alt="Scribemate Logo" 
          style={{ width: 268, height: 268 }} 
        />
        <h1>Welcome to {APP_NAME}</h1>
        <p className="tagline">{TAGLINE}</p>
      </header>
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 32,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Primary Color Buttons */}
        <Button testid="pink-tiger" variant="outlined">Join In</Button>
        <Button testid="misty-harbour" variant="text">Sign In</Button>
        <Button testid="golden-sunset">Get Started</Button>
        <Button testid="silver-moonlight" size="lg">Start Your 14-Day Sprint</Button>
        <Button testid="crimson-rose" size="sm">Small Button</Button>
      </div>
      {/* Secondary Color Buttons */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button testid="azure-sky" color="secondary" variant="outlined">
          Join In
        </Button>
        <Button testid="emerald-forest" color="secondary" variant="text">
          Sign In
        </Button>
        <Button testid="sapphire-ocean" color="secondary">Get Started</Button>
        <Button testid="amethyst-dream" color="secondary" size="lg">
          Start Your 14-Day Sprint
        </Button>
        <Button testid="jade-river" color="secondary" size="sm">
          Small Button
        </Button>
      </div>

      {/* Grey Color Buttons */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button testid="charcoal-smoke" color="grey" variant="outlined">
          Join In
        </Button>
        <Button testid="pearl-dust" color="grey" variant="text">
          Sign In
        </Button>
        <Button testid="steel-shadow" color="grey">Get Started</Button>
        <Button testid="graphite-stone" color="grey" size="lg">
          Start Your 14-Day Sprint
        </Button>
        <Button testid="silver-frost" color="grey" size="sm">
          Small Button
        </Button>
      </div>

      {/* Icon Showcase */}
      <div
        style={{
          display: "flex",
          gap: 48,
          justifyContent: "center",
          alignItems: "center",
          margin: "48px 0",
        }}
      >
        <Icon
          testid="bell-icon-circle"
          variant="circle"
          size={80}
          noBg={false}
          style={{ background: "var(--secondary-100)" }}
          color="var(--secondary-700)"
        >
          <Bell weight="fill" />
        </Icon>
        <Icon
          testid="users-icon-square"
          variant="roundedSquare"
          size={80}
          noBg={false}
          style={{ background: "var(--primary-100)" }}
          color="var(--primary-700)"
        >
          <UsersThree weight="duotone" />
        </Icon>
        <Icon testid="trophy-icon-circle" variant="circle" size={80} noBg={false}>
          <Trophy weight="fill" />
        </Icon>
        <Icon
          testid="cursor-icon-square"
          variant="roundedSquare"
          size={80}
          noBg={false}
          style={{ color: "var(--secondary-700)" }}
        >
          <Cursor weight="fill" />
        </Icon>
        <Icon testid="users-small-circle" variant="circle" size={56} noBg={false}>
          <Users weight="fill" />
        </Icon>
        <Icon testid="users-small-square" variant="roundedSquare" size={56} noBg={false}>
          <Users weight="fill" />
        </Icon>
        <Icon testid="flame-icon-circle" variant="circle" size={56} noBg={false}>
          <Flame weight="fill" />
        </Icon>
        <Icon testid="rocket-icon-square" variant="roundedSquare" size={56} noBg={false}>
          <Rocket weight="bold" />
        </Icon>
      </div>

      {/* Button with Icons Showcase */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 32,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button testid="notifications-btn" leftIcon={<Bell weight="fill" size={20} />}>
          Notifications
        </Button>
        <Button testid="view-users-btn" rightIcon={<Users weight="fill" size={20} />}>
          View Users
        </Button>
        <Button 
          testid="start-journey-btn"
          leftIcon={<Trophy weight="fill" size={20} />}
          rightIcon={<Rocket weight="bold" size={20} />}
        >
          Start Journey
        </Button>
        <Button 
          testid="hot-action-btn"
          color="secondary"
          leftIcon={<Flame weight="fill" size={20} />}
        >
          Hot Action
        </Button>
        <Button 
          testid="content-library"
          color="grey"
          variant="text"
          size="sm"
          leftIcon={<Folder weight="fill" size={20} />}
        >
          Content Library
        </Button>
        <Button 
          testid="click-here-btn"
          color="grey"
          rightIcon={<Cursor weight="fill" size={20} />}
        >
          Click Here
        </Button>
      </div>

      {/* Text Component Showcase */}
      <div
        style={{
          maxWidth: "800px",
          margin: "48px auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          textAlign: "center",
        }}
      >
        <Text testid="heading-1" variant="h1">Heading 1</Text>
        <Text testid="heading-2" variant="h2">Heading 2</Text>
        <Text testid="heading-3" variant="h3">Heading 3</Text>
        <Text testid="heading-4" variant="h4">Heading 4</Text>
        <Text testid="heading-5" variant="h5">Heading 5</Text>
        <Text testid="heading-6" variant="h6">Heading 6</Text>
        <Text testid="body-1-text" variant="body1">
          Body 1 - This is the main body text used for most content. It provides
          good readability while maintaining a comfortable size for extended
          reading.
        </Text>
        <Text testid="body-2-text" variant="body2">
          Body 2 - This is the smaller body text, perfect for secondary
          information or when space is limited.
        </Text>
        <Text testid="muted-1-text" variant="muted1">
          Muted 1 - Quieter text. This is used for less important information,
          like timestamps or secondary details.
        </Text>
        <Text testid="muted-2-text" variant="muted2">
          Muted 2 - Quieter text. This is used for less important information,
          like timestamps or secondary details.
        </Text>
        <Text testid="caption-text" variant="caption">
          Caption - For image captions and small labels.
        </Text>
        <Text testid="label-text" variant="caption">
          Label - For image captions and small labels.
        </Text>
      </div>

      {/* Chip Component Showcase */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
          margin: "48px 0",
          flexWrap: "wrap",
        }}
      >
        <Chip testid="large-chip" label="Large" variant="primary" size="lg" />
        <Chip testid="medium-chip" label="Medium" variant="primary" />
        <Chip testid="small-chip" label="Small" variant="primary" size="sm" />
        <Chip testid="xs-chip" label="XS" variant="primary" size="xs" />
        <Chip testid="new-chip" label="New" variant="secondary" />
        <Chip testid="small-secondary-chip" label="Small" variant="secondary" size="sm" />
        <Chip testid="xs-secondary-chip" label="XS" variant="secondary" size="xs" />
        <Chip
          testid="healthcare-chip"
          label="Healthcare"
          variant="primary"
          icon={<Check weight="fill" size={16} />}
        />
        <Chip testid="cardiology-chip" label="Cardiology" variant="light" rightIcon={<X size={16} />} />
        <Chip testid="cardiology-chip" label="Trending" variant="light" size="xs" />
        <Chip testid="success-chip" label="Success" variant="success" />
        <Chip testid="success-xs-chip" label="Success" variant="success" size="xs" />
        <Chip testid="warning-xs-chip" label="Warning" variant="warning" size="xs" />
        <Chip testid="error-xs-chip" label="Error" variant="error" size="xs" />
      </div>

      {/* Dropdown Component Showcase */}
      <div
        style={{
          maxWidth: "500px",
          margin: "48px auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Text testid="multi-select-title" variant="h4">Multi-select Dropdown</Text>
        <Dropdown
          testid="specialties-dropdown"
          options={[...allSpecialties, ...selectedSpecialties].filter(
            (v, i, a) => a.indexOf(v) === i
          )}
          selected={selectedSpecialties}
          onChange={setSelectedSpecialties}
          placeholder="Select carers..."
        />

        <Text testid="single-select-title" variant="h4">Single-select Dropdown</Text>
        <Dropdown
          testid="doctors-dropdown"
          options={allDoctors}
          selected={selectedDoctor}
          onChange={setSelectedDoctor}
          placeholder="Select a doctor..."
          multiple={false}
        />
      </div>

      {/* Component Showcase */}
      <div
        style={{
          display: "flex",
          gap: 24,
          margin: "32px 0",
          maxWidth: 1200,
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* SegmentedControl */}
        <div style={{ flex: 1 }}>
          {/* SegmentedControl Demo */}
          <SegmentedControl
            testid="difficulty-selector"
            options={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>
        {/* Stepper*/}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Stepper Demo */}
          <div style={{ width: "100%", maxWidth: 320, padding: 16 }}>
            <Stepper testid="progress-stepper" currentStep={2} totalSteps={3} />
          </div>
        </div>
        {/* Avatar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            borderRadius: 12,
            minHeight: 64,
          }}
        >
          <Avatar testid="jd-small-primary" initials="JD" color="primary" variant="sm" />
          <Avatar testid="sm-small-secondary" initials="SM" color="secondary" variant="sm" />
          <Avatar testid="jd-medium-primary" initials="JD" color="primary" />
          <Avatar testid="sm-medium-secondary" initials="SM" color="secondary" />
          <Avatar testid="jd-large-primary" initials="JD" color="primary" variant="lg" />
          <Avatar testid="sm-large-secondary" initials="SM" color="secondary" variant="lg" />
          <Avatar testid="jd-outlined-primary" initials="JD" color="primary" variant="outlined" />
          <Avatar testid="sm-outlined-secondary" initials="SM" color="secondary" variant="outlined" />
          
          {/* Image Avatar Examples */}
          <Avatar testid="camila-jpg-small" image="/camila.jpg" variant="sm" />
          <Avatar testid="camila-jpg-medium" image="/camila.jpg" />
          <Avatar testid="camila-jpg-large" image="/camila.jpg" variant="lg" />
          <Avatar testid="daniel-jpg-outlined" image="/daniel.jpg" variant="outlined" />
          <Avatar testid="user-svg-medium" image={userSvg} />
        </div>
      </div>

      {/* Card Component Showcase */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 32,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Card with all props */}
        <Card
          testid="group-accountability-card"
          icon={
            <Icon
              testid="bell-card-icon"
              variant="circle"
              size={80}
              noBg={false}
              style={{ background: "var(--secondary-100)" }}
              color="var(--secondary-700)"
            >
              <Bell weight="fill" />
            </Icon>
          }
          title="Group Accountability"
          body="Success depends on everyone - no one gets left behind"
        />
        {/* Sample Card moved here to appear side-by-side */}
        <Card
          testid="clock-card"
          icon={
            <Icon
              testid="clock-icon"
              variant="circle"
              size={56}
              noBg={false}
              style={{ background: "var(--primary-100)" }}
              color="var(--primary-700)"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 256 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="128" cy="128" r="96" fill="currentColor" />
                <path
                  d="M128 72v56l40 24"
                  stroke="#fff"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Icon>
          }
          title="Sample Card"
          body="Timestamped shift tracking for every caregiver"
        />
      </div>

      {/* Input Variants Showcase 1 */}
      <div
        style={{
          display: "flex",
          gap: 24,
          margin: "32px 0",
          maxWidth: 1200,
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Plain input */}
        {/* Input with label */}
        <div style={{ flex: 1 }}>
          <Input testid="labeled-input" label="With Label" placeholder="Label above" />
        </div>
        {/* Input with value */}
        <div style={{ flex: 1 }}>
          <Input testid="preset-input" value="Preset value" readOnly />
        </div>
      </div>
      {/* Input Variants Showcase 2 */}
      <div
        style={{
          display: "flex",
          gap: 24,
          margin: "32px 0",
          maxWidth: 1200,
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Input with left icon (search) */}
        <div style={{ flex: 1 }}>
          <Input
            testid="search-input"
            leftIcon={
              <Icon testid="search-icon" size={32}>
                <MagnifyingGlass />
              </Icon>
            }
            placeholder="Search by name"
          />
        </div>
        {/* Input with right icon (calendar) */}
        <div style={{ flex: 1 }}>
          <Input
            testid="calendar-input"
            rightIcon={
              <Icon testid="calendar-icon" size={32}>
                <Calendar />
              </Icon>
            }
            placeholder="Pick a date"
          />
        </div>
        {/* Input with both icons */}
        <div style={{ flex: 1 }}>
          <Input
            testid="search-calendar-input"
            leftIcon={
              <Icon testid="search-bg-icon" size={32} noBg={false}>
                <MagnifyingGlass />
              </Icon>
            }
            rightIcon={
              <Icon testid="calendar-bg-icon" size={24} noBg={false}>
                <Calendar />
              </Icon>
            }
            placeholder="Search with date"
          />
        </div>
      </div>

      {/* InputBox Showcase */}
      <div
        style={{
          maxWidth: 1200,
          margin: "32px auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <InputBox testid="message-inputbox" placeholder="Type your message here..." maxLength={30} />
      </div>

      {/* Dott Component Showcase */}

      {/* Solid variants */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <Text testid="solid-label" variant="body2">Solid:</Text>
        <Dott testid="primary-dot-8" color="var(--primary-500)" size={8} />
        <Dott testid="primary-dot-12" color="var(--primary-500)" size={12} />
        <Dott testid="primary-dot-16" color="var(--primary-500)" size={16} />
        <Dott testid="neutral-dot-10" color="var(--neutral-600)" size={10} />
      </div>

      {/* Hollow variants */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        <Text testid="hollow-label" variant="body2">Hollow:</Text>
        <Dott testid="hollow-primary-8" variant="hollow" color="var(--primary-500)" size={8} />
        <Dott testid="hollow-primary-12" variant="hollow" color="var(--primary-500)" size={12} />
        <Dott testid="hollow-secondary-10" variant="hollow" color="var(--secondary-500)" size={10} />
        <Dott testid="hollow-neutral-10" variant="hollow" color="var(--neutral-600)" size={10} />
      </div>

      {/* Toggle Component Showcase */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          justifyContent: "center",
          margin: "32px 0",
        }}
      >
        <Text testid="toggle-on-label" variant="body2">On:</Text>
        <Toggle testid="toggle-on" isOn={isToggleOn} onChange={setIsToggleOn} />
        <Text testid="toggle-off-label" variant="body2">Off:</Text>
        <Toggle testid="toggle-off" isOn={!isToggleOn} onChange={setIsToggleOn} />
      </div>

      {/* Checkbox Component Showcase */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
          justifyContent: "center",
          margin: "32px auto",
          maxWidth: "300px",
        }}
      >
        <Checkbox
          testid="email-checkbox"
          label="Email notifications"
          checked={emailNotifications}
          onChange={setEmailNotifications}
        />
        <Checkbox
          testid="sms-checkbox"
          label="SMS reminders"
          checked={smsReminders}
          onChange={setSmsReminders}
        />
      </div>

      {/* Radio Component Showcase */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
          justifyContent: "center",
          margin: "32px auto",
          maxWidth: "300px",
        }}
      >
        <Radio
          testid="morning-radio"
          label="Morning (8:00 AM - 12:00 PM)"
          name="deliveryTime"
          value="morning"
          checked={deliveryTime === "morning"}
          onChange={setDeliveryTime}
        />
        <Radio
          testid="afternoon-radio"
          label="Afternoon (12:00 PM - 5:00 PM)"
          name="deliveryTime"
          value="afternoon"
          checked={deliveryTime === "afternoon"}
          onChange={setDeliveryTime}
        />
      </div>

      {/* Color Showcase */}
      <ColorSwitcher />

      
    </div>
  );
}

export default DemoPage;
