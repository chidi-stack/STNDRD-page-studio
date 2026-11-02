// Mockup 02c — DuplicatePage
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function DuplicatePage() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="duplicate" layout="A" embedded />
    </div>
  );
}
