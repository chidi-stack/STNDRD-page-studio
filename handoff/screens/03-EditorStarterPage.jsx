// Mockup 03 — EditorStarterPage
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function EditorStarterPage() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="editor-empty" layout="A" embedded />
    </div>
  );
}
