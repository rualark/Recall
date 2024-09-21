export function getUrlParam(par) {
  let url_string = window.location.href;
  let url = new URL(url_string);
  return url.searchParams.get(par);
}

function cleanStringArray(arr) {
  // Remove empty strings at the beginning
  while (arr.length > 0 && arr[0] === "") {
    arr.shift();
  }
  
  // Remove empty strings at the end
  while (arr.length > 0 && arr[arr.length - 1] === "") {
    arr.pop();
  }
  
  // Remove consecutive empty strings
  return arr.filter((item, index, array) => {
    return !(item === "" && array[index - 1] === "");
  });
}

export function groupsAndSecrets(src) {
  const lines = src.split('\n');
  const groups = [];
  let secrets = [];
  let pairs = [];
  for (const line of lines) {
    if (line.trim() === '---') {
      if (pairs.length) {
        groups.push(pairs);
        pairs = [];
      }
    } else if (line.startsWith('? ')) {
      let [question, answer] = line.slice(2).split('=');
      pairs.push([question.trim(), answer.trim()]);
    } else {
      secrets.push(line);
    }
  }
  if (pairs.length || !groups.length) {
    groups.push(pairs);
  }
  secrets = cleanStringArray(secrets);
  return { groups, secrets };
}

export function parseGroups(src) {
  const { groups, secrets: _ } = groupsAndSecrets(src);
  return groups;
}

export function groupsToString(groups) {
  let st = '';
  for (let group of groups) {
    if (st !== '') {
      st += '---\n\n';
    }
    for (let pair of group) {
      st += `? ${pair[0]} = ${pair[1]}\n\n`
    }
  }
  return st.trim();
}

export function updateGroups(groups, answers, permutation) {
  let aid = 0;
  for (let answer of answers) {
    groups[0][aid][0] = answer[permutation[aid]];
    aid += 1;
  }
}

export function sortAnswers(groups) {
  return groups.map(group => {
    // Extract first elements from each pair
    let firstElements = group.map(pair => pair[0]);

    // Sort the first elements in ascending order
    firstElements.sort();

    // Reassign sorted first elements back to pairs
    return group.map((pair, index) => [firstElements[index], pair[1]]);
  });
}
