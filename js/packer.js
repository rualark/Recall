import {encrypt} from "./aes.js";
import {groupsAndSecrets, groupsToString} from "./data.js";
import {hashSHA256} from "./hash.js";

function shufflePairs(groups) {
  return groups.map(group => {
    let firstElements = group.map(pair => pair[0]);

    // Shuffle the second elements
    for (let i = firstElements.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [firstElements[i], firstElements[j]] = [firstElements[j], firstElements[i]];
    }

    // Reassign shuffled second elements back to pairs
    return group.map((pair, index) => [firstElements[index], pair[1]]);
  });
}

async function pack() {
  const { groups, secrets } = groupsAndSecrets(document.getElementById('secret').value.trim());
  let res = secrets.join('\n');
  for (let i = groups.length - 1; i >= 0; i--) {
    document.getElementById('packed').value = `Encrypting layer ${i + 1}...`;
    const group = groups[i];
    const shuffled = shufflePairs([group]);
    const shuffled_str = groupsToString(shuffled);
    const groups_str = groupsToString([group]);
    const b64 = LZString.compressToBase64(shuffled_str);
    const encrypted = await encrypt(groups_str, res);
    const hash = await hashSHA256(res);
    const date = new Date().toISOString();
    
    res = 'RECALL:' + b64 + ':' + encrypted + ':' + hash + ':' + date;
  }
  document.getElementById('packed').value = res;
}

document.getElementById('pack').onclick=function(){
  pack();
};

pack();
