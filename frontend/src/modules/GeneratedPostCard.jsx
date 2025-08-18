import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../components/Button";
import Text from "../components/Text";
import Icon from "../components/Icon";
import {
  ArrowClockwise,
  Download,
  Copy,
  CaretDown,
  CaretUp,
  LockOpen,
  Folder,
  Trash,
  Palette,
} from "phosphor-react";
import "./GeneratedPostCard.css";

function GeneratedPostCard({ text, image, platform = "Facebook", style = {}, ...props }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate text to 350 characters initially
  const truncatedText =
    text.length > 350 ? text.substring(0, 350) + "..." : text;
  const displayText = isExpanded ? text : truncatedText;
  const shouldShowSeeMore = text.length > 350;

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRegenerateText = () => {
    console.log("Regenerate text clicked");
  };

  return (
    <div className="generated-post-card" style={style} {...props}>
      {/* Main Content Card */}
      <div className="generated-post-card__main">
        {/* Text Content Section */}
        <div className="generated-post-card__text-section">
          <Text
            variant="body1"
            color="var(--neutral-900)"
            className="generated-post-card__text-content"
          >
            {displayText}
          </Text>

          {/* Action Buttons Row */}
          <div className="generated-post-card__actions-row">
            {/* Toggle Text Button */}
            {shouldShowSeeMore && (
              <Button
                variant="text"
                color="primary"
                size="sm"
                onClick={handleToggleText}
                className="generated-post-card__toggle-button"
              >
                <Text
                  variant="body2"
                  color="var(--primary-500)"
                  style={{ fontWeight: 500 }}
                >
                  {isExpanded ? "see less" : "see more"}
                </Text>
                {isExpanded ? (
                  <CaretUp size={16} weight="bold" />
                ) : (
                  <CaretDown size={16} weight="bold" />
                )}
              </Button>
            )}

            {/* Regenerate Text Button */}
            <Button
              variant="text"
              color="primary"
              size="sm"
              onClick={handleRegenerateText}
              leftIcon={<ArrowClockwise weight="fill" size={16} />}
            >
                Regenerate Text
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="generated-post-card__image-section"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Icon Buttons Overlay */}
          <div className="generated-post-card__icon-overlay">
            {/* Refresh Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <ArrowClockwise weight="bold" />
            </Icon>

            {/* Download Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <Download weight="bold" />
            </Icon>

            {/* Copy Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <Copy weight="bold" />
            </Icon>

            {/* Lock Button */}
            <Icon
              variant="circle"
              size={32}
              noBg={false}
              className="generated-post-card__icon-button"
              color="var(--neutral-900)"
            >
              <LockOpen weight="bold" />
            </Icon>
          </div>
        </div>
      </div>

      {/* Action Buttons Row - Outside the main card */}
      <div className="flex-row-wrap">
        {/* Save to Drafts Button */}
        <Button
          variant="default"
          color="primary"
          size="md"
          leftIcon={<Folder weight="bold" size={20} />}
        >
            Save to Drafts
        </Button>

        {/* Copy Text Button */}
        <Button
          variant="default"
          color="neutral"
          size="md"
          leftIcon={<Copy weight="bold" size={20} />}
        >
            Copy Text
        </Button>

        {/* Download Image Button */}
        <Button
          variant="default"
          color="neutral"
          size="md"
          leftIcon={<Download weight="bold" size={20} />}
        >
            Download Image
        </Button>

        {/* Discard Post Button */}
        <Button
          variant="text"
          color="error"
          size="md"
          leftIcon={<Trash weight="bold" size={20} />}
        >
            Discard Post
        </Button>
      </div>

        {/* Content Library and Brand Profile Actions */}
        <div className="flex-row-wrap generated-post-card__bottom-actions">
          {/* View All Drafts Button */}
          <Button
            variant="text"
            color="primary"
            size="sm"
            leftIcon={<Folder weight="fill" size={14} />}
            style={{ paddingLeft: 0, fontWeight: 500 }}
          >
            View All Drafts in Content Library
          </Button>

          {/* Update Brand Profile Button */}
          <Button
            variant="text"
            color="primary"
            size="sm"
            leftIcon={<Palette weight="fill" size={14} />}
            style={{ paddingLeft: 0, fontWeight: 500 }}
          >
            Update Brand Profile or Assets
          </Button>
        </div>
    </div>
  );
}

GeneratedPostCard.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  platform: PropTypes.oneOf(["LinkedIn", "Facebook", "Blog"]),
  style: PropTypes.object,
};

export default GeneratedPostCard;
