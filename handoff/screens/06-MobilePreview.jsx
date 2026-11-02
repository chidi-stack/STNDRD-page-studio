// Mockup 06 — MobilePreview
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function MobilePreview() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="editor-mobile" layout="A" embedded />
    </div>
  );
}
