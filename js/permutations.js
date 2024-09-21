export function answersHaveDuplicates (permutation, answers) {
  const unique = new Set()
  let aid = 0
  let hasDuplicates = false
  for (const answer of answers) {
    if (unique.has(answer[permutation[aid]])) {
      hasDuplicates = true
      break
    }
    unique.add(answer[permutation[aid]])
    aid += 1
  }
  return hasDuplicates
}

export function nextPermutation (permutation, answers) {
  // Start from the end of the permutation array
  for (let i = permutation.length - 1; i >= 0; i--) {
    // Check if we can increase the current position
    if (permutation[i] + 1 < answers[i].length) {
      permutation[i]++ // Increment the current index
      // Reset all the indices to the right of the current position to zero
      for (let j = i + 1; j < permutation.length; j++) {
        permutation[j] = 0
      }
      // There was a valid next permutation
      return false
    }
  }
  // No more permutations, we have cycled through all possibilities
  return true
}
