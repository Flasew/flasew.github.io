// Dynamic tooltip positioning to keep within viewport
document.addEventListener('DOMContentLoaded', function() {
  const tooltips = document.querySelectorAll('.tooltip');
  
  tooltips.forEach(function(tooltip) {
    const tooltipText = tooltip.querySelector('.tooltiptext');
    
    tooltip.addEventListener('mouseenter', function() {
      // Small delay to ensure tooltip is rendered
      setTimeout(function() {
        adjustTooltipPosition(tooltip, tooltipText);
      }, 10);
    });
    
    // Also adjust on window resize
    window.addEventListener('resize', function() {
      if (tooltipText.style.visibility === 'visible' || 
          window.getComputedStyle(tooltipText).visibility === 'visible') {
        adjustTooltipPosition(tooltip, tooltipText);
      }
    });
  });
});

function adjustTooltipPosition(tooltip, tooltipText) {
  // Reset to default positioning first
  tooltipText.style.left = '50%';
  tooltipText.style.transform = 'translateX(-50%)';
  tooltipText.style.right = 'auto';
  tooltipText.style.bottom = '';
  tooltipText.style.top = '';
  tooltipText.classList.remove('tooltip-below');
  
  const rect = tooltipText.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 15; // Minimum margin from edge
  
  // Check if tooltip goes off the top edge
  if (rect.top < margin) {
    // Flip tooltip to appear below the text instead
    tooltipText.classList.add('tooltip-below');
    tooltipText.style.bottom = 'auto';
    tooltipText.style.top = '125%';
  }
  
  // Re-get rect after potential flip
  const newRect = tooltipText.getBoundingClientRect();
  
  // Check if tooltip goes off the left edge
  if (newRect.left < margin) {
    const offset = margin - newRect.left;
    tooltipText.style.left = `calc(50% + ${offset}px)`;
    tooltipText.style.transform = `translateX(calc(-50% + ${offset}px))`;
  }
  
  // Check if tooltip goes off the right edge
  if (newRect.right > viewportWidth - margin) {
    const offset = newRect.right - (viewportWidth - margin);
    tooltipText.style.left = `calc(50% - ${offset}px)`;
    tooltipText.style.transform = `translateX(calc(-50% - ${offset}px))`;
  }
  
  // Ensure tooltip doesn't exceed max-width on very small screens
  const maxWidth = viewportWidth - (2 * margin);
  if (newRect.width > maxWidth) {
    tooltipText.style.width = `${maxWidth}px`;
    tooltipText.style.maxWidth = `${maxWidth}px`;
  }
}
