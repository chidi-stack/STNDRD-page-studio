// Mockup 02 — CreatePage
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function CreatePage() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="create" layout="A" embedded />
    </div>
  );
}
