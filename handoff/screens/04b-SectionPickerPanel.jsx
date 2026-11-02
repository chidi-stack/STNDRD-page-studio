// Mockup 04b — SectionPickerPanel
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function SectionPickerPanel() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="picker-panel" layout="A" pickerStyle="panel" embedded />
    </div>
  );
}
