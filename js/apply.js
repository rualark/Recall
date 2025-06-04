export function initApply() {
  document.getElementById('search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // Find first visible cell in column2
      const visibleCells = Array.from(document.querySelectorAll('.column2 .cell'))
        .filter(cell => cell.style.display !== 'none');
      
      if (visibleCells.length > 0) {
        const firstCell = visibleCells[0];
        const block = firstCell.firstChild;
        if (block && block.nodeType === Node.ELEMENT_NODE) {
          block.click();
        }
      }

      // Find first visible pair in column1
      const visiblePairs = Array.from(document.querySelectorAll('.column1 .pair'))
        .filter(pair => pair.style.display !== 'none');
      
      if (visiblePairs.length > 0) {
        const firstPair = visiblePairs[0];
        const secondCell = firstPair.children[1];
        if (secondCell && secondCell.nodeType === Node.ELEMENT_NODE) {
          secondCell.click();
        }
      }
    }
  });
}
