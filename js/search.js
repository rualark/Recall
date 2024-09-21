export function initSearch() {
  document.addEventListener('keydown', (event) => {
    // The keyCode for ` in English layout is 192
    if (event.keyCode === 192) {
        event.preventDefault();
        document.getElementById('search').focus();
        document.getElementById('search').select();
    }
  });

  document.getElementById('search').oninput=function(){
    filterAnswers();
    filterQuestions();
  };
}

function filterAnswers() {
  const secondColumnCells = document.querySelectorAll('.column2 .cell');
  const search = document.getElementById('search').value.toLowerCase();

  secondColumnCells.forEach(cell => {
    const block = cell.firstChild;
    
    if (block && block.nodeType === Node.ELEMENT_NODE) {
      const text = block.textContent.toLowerCase();
      if (search === '' || text.includes(search)) {
        // Show the cell
        cell.style.display = '';
      } else {
        // Hide the cell
        cell.style.display = 'none';
      }
    }
  });  
}

function filterQuestions() {
  const pairs = document.querySelectorAll('.column1 .pair');
  const search = document.getElementById('search').value.toLowerCase();
  
  pairs.forEach(pair => {
    if (pair.children[1].children.length > 0 && search !== '') {
      pair.style.display = 'none';
    } else {
      pair.style.display = 'flex';
    }
  });  
}
