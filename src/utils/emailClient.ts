import React from 'react';

export const GMAIL_RECIPIENT = 'speakenglishwithnick@gmail.com';

export const getSmartEmailUrls = (subject?: string, body?: string) => {
  const defaultSubject = subject || 'Question for Teacher Nick';
  const encodedSubject = encodeURIComponent(defaultSubject);
  const encodedBody = body ? encodeURIComponent(body) : '';

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_RECIPIENT}&su=${encodedSubject}${encodedBody ? `&body=${encodedBody}` : ''}`;
  const mailtoUrl = `mailto:${GMAIL_RECIPIENT}?subject=${encodedSubject}${encodedBody ? `&body=${encodedBody}` : ''}`;

  return { gmailWebUrl, mailtoUrl };
};

export const handleSmartEmailClick = (
  e?: React.MouseEvent,
  subject?: string,
  body?: string
) => {
  if (e) {
    e.preventDefault();
  }

  const { gmailWebUrl, mailtoUrl } = getSmartEmailUrls(subject, body);

  // Detect if user is on mobile (Android / iOS / Phone)
  const isMobile =
    typeof window !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    // On mobile devices, redirect to mailto which opens the device's Gmail / Mail app
    window.location.href = mailtoUrl;
  } else {
    // On desktop/laptop, open Gmail web compose directly in a new browser tab
    window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
  }
};
