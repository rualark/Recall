export function generateColumnsForGroup(group, clickBlock, clickCell) {
  console.log(group.map(subArray => subArray[0]).join(','));
  // Clear the main container before generating new content
  const mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = '';

  // Create the first (left) column
  const column1 = document.createElement('div');
  column1.className = 'column1';

  // Create the second (right) column
  const column2 = document.createElement('div');
  column2.className = 'column2';

  group.forEach((pair, index) => {
    // Create an question cell in the zero column
    const pairCell = document.createElement('div');
    pairCell.className = 'pair';
    pairCell.style.display = 'flex';  // Use flexbox for layout
    pairCell.style.justifyContent = 'space-between';  // Spread them to opposite sides
        
    const questionCell = document.createElement('div');
    questionCell.className = 'question';
    questionCell.textContent = pair[1];

    // Create an empty cell in the first column
    const emptyCell = document.createElement('div');
    emptyCell.className = 'cell';
    emptyCell.onclick = clickCell;

    pairCell.appendChild(questionCell);
    pairCell.appendChild(emptyCell);

    // Create a cell with text block in the second column
    const textCell = document.createElement('div');
    textCell.className = 'cell';
    textCell.onclick = clickCell;

    const block = document.createElement('div');
    block.className = 'block';
    block.draggable = true;
    block.textContent = pair[0];
    block.onclick = clickBlock;

    textCell.appendChild(block);
    column1.appendChild(pairCell);
    column2.appendChild(textCell);
  });

  document.getElementById('main-container').appendChild(column1);
  document.getElementById('main-container').appendChild(column2);
}

// Updates the colors of the blocks based on their usage.
export function updateUsage(answers) {
  const blocks = new Set(answers.flat());

  const secondColumnCells = document.querySelectorAll('.column2 .block');
  secondColumnCells.forEach(block => {
    if (blocks.has(block.textContent)) {
      block.style.backgroundColor = '#e0e0e0';
      block.style.color = '#909090';
      block.style.border = '1px solid #909090';
    } else {
      block.style.backgroundColor = '#d0d0d0';
      block.style.color = '#000';
      block.style.border = '1px solid #000';
    }
  });
}

export function cloneBlock(block, clickBlock) {
  const clone = block.cloneNode(true);
  clone.onclick = clickBlock;
  return clone;
}

export function getFirstColumnTexts() {
  const firstColumnCells = document.querySelectorAll('.column1 .cell');
  const texts = [];
  
  firstColumnCells.forEach(cell => {
    const blocks = []
    for (let child of cell.children) {
      blocks.push(child.textContent)
    }
    texts.push(blocks);
  });
  return texts;
}

