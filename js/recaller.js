import {decrypt} from "./aes.js";
import {initSearch} from "./search.js";
import {parseGroups, groupsToString, getUrlParam, updateGroups, sortAnswers} from "./data.js";
import {hashSHA256} from "./hash.js";
import {nextPermutation, answersHaveDuplicates} from "./permutations.js";
import {generateColumnsForGroup, updateUsage, cloneBlock, getFirstColumnTexts} from "./ui.js";

let selectedBlock = null;
let groups;
let resetScanFlag = true;

function clickCell(event) {
  const targetCell = event.target;
  if (selectedBlock == null) {
    return;
  }
  if (!targetCell.classList.contains('cell')) {
    return;
  }
  if (targetCell.parentElement.classList.contains('pair')) {
    const clonedBlock = cloneBlock(selectedBlock, clickBlock);
    clonedBlock.style.backgroundColor = '#d0d0d0';
    targetCell.appendChild(clonedBlock);
    selectedBlock.style.backgroundColor = '#d0d0d0';
    selectedBlock = null;
  } else {
    if (selectedBlock.parentElement.parentElement.classList.contains('pair')) {
      selectedBlock.remove();
    }
    selectedBlock = null;
  }
  validate();
}

function selectBlock(block) {
  selectedBlock = block;
  selectedBlock.style.backgroundColor = '#ffbb88';
  selectedBlock.style.color = '#000';
  selectedBlock.style.border = '1px solid #000';
}

function clickBlock(event) {
  if (selectedBlock) {
    clickCell({target: event.target.parentElement});
  } else {
    selectBlock(event.target);
  }
}

function validate() {
  const answers = getFirstColumnTexts();
  updateUsage(answers);
  for (let answer of answers) {
    if (answer.length === 0) {
      return;
    }
  }
  resetScanFlag = true;
}

function unpack() {
  const packed = document.getElementById('packed').value.trim();
  const groups_str = LZString.decompressFromBase64(packed.split(':')[1]);
  groups = sortAnswers(parseGroups(groups_str));
  generateColumnsForGroup(groups[0], clickBlock, clickCell);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkPermutation(permutation, answers, packed, finished) {
  updateGroups(groups, answers, permutation);
  const groups_str = groupsToString(groups);
  const encrypted = packed.split(':')[2];
  try {
    const decrypted = await decrypt(groups_str, encrypted);
    document.getElementById('scan-progress').textContent = 'Found correct combination';
    const hash = await hashSHA256(decrypted);
    if (hash === packed.split(':')[3]) {
      finished = true;
      if (decrypted.startsWith('RECALL:')) {
        document.getElementById('packed').value = decrypted;
        unpack();
      } else {
        document.getElementById('secret').value = decrypted;
        document.querySelectorAll('.column1').forEach(el => {
          el.style.backgroundColor = '#77ff77';
        });
      }
    }
  } catch (error) {
    // continue regardless of error
  }
  return finished;
}

async function scan() {
  let permutation = [];
  let finished = false;
  while (true) {
    const packed = document.getElementById('packed').value.trim();
    const answers = getFirstColumnTexts();
    let filled = true;
    for (let answer of answers) {
      if (answer.length === 0) {
        filled = false;
        break;
      }
    }
    if (filled) {
      if (resetScanFlag) {
        resetScanFlag = false;
        finished = false;
        permutation = Array(answers.length).fill(0);
      }
      if (finished) {
        // Finished scanning, wait for reset.
        await delay(100);
        document.getElementById('scan-progress').textContent = 'Finished scanning permutations';
      } else {
        // Can check permutation.
        document.getElementById('scan-progress').textContent = `Scanning: ${permutation}`;
        finished = await checkPermutation(permutation, answers, packed, finished);
      }
      while (true) {
        finished = nextPermutation(permutation, answers);
        if (finished) break;
        if (!answersHaveDuplicates(permutation, answers)) {
          break;
        }
      }
    } else {
      // Form not filled.
      await delay(100);
    }
  }
}

function init() {
  document.getElementById('unpack').onclick = function() {
    unpack();
  }

  if (getUrlParam('r')) {
    document.getElementById('packed').value = getUrlParam('r');
  }

  unpack();
  scan();
  initSearch();
}

init();
