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
import { copyText } from "../utils/copyText";
import "./GeneratedPostCard.css";

function GeneratedPostCard({ 
  title, 
  post, 
  image, 
  platform = "Facebook", 
  maxWordCount, 
  additionalContext, 
  onRegeneratePost, 
  style = {}, 
  ...props 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate post to 350 characters initially
  const truncatedText =
    post.length > 350 ? post.substring(0, 350) + "..." : post;
  const displayText = isExpanded ? post : truncatedText;
  const shouldShowSeeMore = post.length > 350;

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRegenerateText = () => {
    if (onRegeneratePost && title && maxWordCount && additionalContext !== undefined) {
      onRegeneratePost(title, maxWordCount, additionalContext);
    }
  };

  const handleCopyTitle = async () => {
    if (title) {
      const success = await copyText(title);
    }
  };

  const handleCopyPost = async () => {
    if (post) {
      const success = await copyText(post);
      if (success) {
        console.log("Post copied to clipboard");
      } else {
        console.error("Failed to copy post");
      }
    }
  };

  return (
          <div className="generated-post-card" style={style} {...props}>
        {/* Main Content Card */}
        <div className="generated-post-card__main">
          {/* Title */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "-16px",
            }}
          >
            <Text
              variant="h5"
              color="var(--neutral-900)"
            >
              {title}
            </Text>
            <Button
              variant="text"
              color="neutral"
              size="sm"
              style={{ padding: "4px" }}
              onClick={handleCopyTitle}
            >
              <Copy size={20} weight="fill" />
            </Button>
          </div>

          {/* Platform Preview */}
          <Text
            variant="muted2"
            color="var(--neutral-700)"
          >
            {platform} Post Preview
          </Text>

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

            {/* Regenerate Post Button */}
            <Button
              variant="text"
              color="primary"
              size="sm"
              onClick={handleRegenerateText}
              leftIcon={<ArrowClockwise weight="fill" size={16} />}
            >
                Regenerate Post
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
            <Button
              color="neutral"
              size="sm"
              className="generated-post-card__icon-button"
              style={{ 
                padding: "8px",
                borderRadius: "50%",
                minWidth: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ArrowClockwise size={16} weight="bold" />
            </Button>

            {/* Download Button */}
            <Button
              color="neutral"
              size="sm"
              className="generated-post-card__icon-button"
              style={{ 
                padding: "8px",
                borderRadius: "50%",
                minWidth: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Download size={16} weight="bold" />
            </Button>

            {/* Copy Button */}
            <Button
              color="neutral"
              size="sm"
              className="generated-post-card__icon-button"
              style={{ 
                padding: "8px",
                borderRadius: "50%",
                minWidth: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={handleCopyPost}
            >
              <Copy size={16} weight="bold" />
            </Button>

            {/* Lock Button */}
            <Button
              color="neutral"
              size="sm"
              className="generated-post-card__icon-button"
              style={{ 
                padding: "8px",
                borderRadius: "50%",
                minWidth: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <LockOpen size={16} weight="bold" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons Row - Outside the main card */}
              <div className="flex-row-wrap-left">
        {/* Save to Drafts Button */}
        <Button
          variant="default"
          color="primary"
          size="sm"
          leftIcon={<Folder weight="bold" size={20} />}
        >
            Save to Drafts
        </Button>

        {/* Copy Text Button */}
        <Button
          variant="outlined"
          color="secondary"
          size="sm"
          leftIcon={<Copy weight="bold" size={20} />}
          onClick={handleCopyPost}
        >
            Copy Text
        </Button>

        {/* Download Image Button */}
        <Button
          variant="outlined"
          color="secondary"
          size="sm"
          leftIcon={<Download weight="bold" size={20} />}
        >
            Download Image
        </Button>

        {/* Discard Post Button */}
        <Button
          variant="text"
          color="error"
          size="sm"
          leftIcon={<Trash weight="bold" size={20} />}
        >
            Discard Post
        </Button>
      </div>

        {/* Content Library and Brand Profile Actions */}
        <div className="flex-row-wrap-left generated-post-card__bottom-actions">
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
  title: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  platform: PropTypes.oneOf(["LinkedIn", "Facebook", "Blog"]),
  maxWordCount: PropTypes.number.isRequired,
  additionalContext: PropTypes.string.isRequired,
  onRegeneratePost: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default GeneratedPostCard;
