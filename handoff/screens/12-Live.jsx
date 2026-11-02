// Mockup 12 — Live
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function Live() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="published" layout="A" embedded />
    </div>
  );
}
