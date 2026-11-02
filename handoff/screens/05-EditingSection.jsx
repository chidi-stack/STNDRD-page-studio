// Mockup 05 — EditingSection
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function EditingSection() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="editor" layout="A" embedded />
    </div>
  );
}
