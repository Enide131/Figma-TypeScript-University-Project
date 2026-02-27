export const PrintStyles = () => (
  <style>{`
    @media print {
      /* Hide all non-essential elements */
      button, 
      header button,
      .fixed, 
      footer,
      input[type="checkbox"],
      select,
      .no-print {
        display: none !important;
      }

      /* Reset background colors for printing */
      body, div {
        background: white !important;
        color: black !important;
        background-image: none !important;
      }

      /* Ensure content flows properly */
      .h-screen {
        height: auto !important;
        overflow: visible !important;
      }

      /* Hide the scrollbars and overflow containers */
      .overflow-y-auto, .overflow-x-auto {
        overflow: visible !important;
      }

      /* Expand the main content to full width */
      .max-w-\[1600px\] {
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* Grid adjustments for print - stack everything or keep layout? */
      /* Usually stacking is safer for print */
      .grid {
        display: block !important;
      }

      /* Hide the Right Panel (Controls) during print to save paper */
      /* The right panel in SolutionSteps contains "Display Options" and "Actions" which are useless on paper */
      .lg\:grid-cols-\[1fr_300px\] > div:nth-child(2) {
        display: none !important;
      }

      /* Ensure the text is readable */
      p, h1, h2, h3, li, td, th {
        color: black !important;
        text-shadow: none !important;
      }

      /* Table borders */
      table, th, td {
        border: 1px solid #ccc !important;
      }
    }
  `}</style>
);
