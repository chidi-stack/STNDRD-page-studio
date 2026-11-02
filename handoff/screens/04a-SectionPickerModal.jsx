// Mockup 04a — SectionPickerModal
import React from 'react';
import PageStudio from '../components/PageStudio.jsx';

export default function SectionPickerModal() {
  return (
    <div style={{ width: 1440, height: 900 }}>
      <PageStudio start="picker-modal" layout="A" pickerStyle="modal" embedded />
    </div>
  );
}
